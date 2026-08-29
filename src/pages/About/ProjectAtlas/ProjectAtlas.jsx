import React, { useContext, useEffect, useRef, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import sites from './assetzSites.json';
import cityBoundary from './bengaluruBoundary.json';
import greaterBoundary from './greaterBengaluruBoundary.json';
import lpaBoundaries from './lpaBoundaries.json';
import projectMeta from './projectMeta.json';
import './ProjectAtlas.css';

/* Status -> colour lookup (green = Completed, amber = Under Construction).
   amber + green survives colour-blindness where amber's usual partner red fails. */
const STATUS = {
  'Completed':          { fill: '#2f8f5b', ink: '#14532d' },
  'Under Construction': { fill: '#e08a1e', ink: '#8a4b0a' },
};

/* Muted monochrome basemaps so the coloured site boundaries are the only
   saturated thing on screen. Two variants, chosen by the site's dark/light mode.

   These are Esri's legacy ArcGIS Online tile services. They still serve fine,
   but Esri lists them as "in mature support; no longer updated" - the newer
   ArcGIS basemap layer service needs an API key and an ArcGIS account. Note
   this is a different provider from the CARTO tiles used by the Tools maps,
   so the CARTO key does not apply here.

   Attribution below is Esri's own copyrightText for these services; the
   shorter "Tiles (c) Esri" previously used did not credit HERE, Garmin or
   OpenStreetMap as their terms require. */
const ESRI_ATTRIBUTION =
  'Esri, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, and the GIS user community';

const TILES = {
  light: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  dark:  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
};

/* Free satellite/aerial imagery (Esri World Imagery). Google's own tiles need a
   paid Maps API key + billing and can't be embedded directly, so we use Esri —
   the standard no-key satellite basemap for Leaflet. */
const SATELLITE = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
};

/* BMRDA Local Planning Areas, digitized from the official LPA map PDF (legend
   colours matched; georeferenced against OSM taluk boundaries). Approximate —
   underlying map is 1:125,000. BDA is not a layer: it is unfilled on the source
   map, and the atlas already shows BBMP / Greater Bengaluru for the core.
   `on` = default legend state (all off — they overlay the APZ zones). */
const LPAS = [
  { key: 'BIAAPA', label: 'BIAAPA (Airport Area)', color: '#3aa17e', on: false },
  { key: 'Nelamangala', label: 'Nelamangala LPA', color: '#5c7cfa', on: false },
  { key: 'Magadi', label: 'Magadi LPA', color: '#d6336c', on: false },
  { key: 'Hosakote', label: 'Hosakote LPA', color: '#b08a5a', on: false },
  { key: 'Anekal', label: 'Anekal LPA', color: '#9c6ade', on: false },
  { key: 'Kanakapura', label: 'Kanakapura LPA', color: '#4a90c2', on: false },
  { key: 'Channapattana', label: 'Channapattana LPA', color: '#e06060', on: false },
  { key: 'Ramanagara', label: 'Ramanagara LPA', color: '#4c9a4c', on: false },
  { key: 'BMICAPA', label: 'BMICAPA (Mysore Corridor)', color: '#868e96', on: false },
  { key: 'STRR', label: 'STRR Corridor', color: '#b8a60a', on: false },
  { key: 'SmartCity', label: 'Greater Bengaluru–Bidadi Smart City', color: '#0aa2c0', on: false },
];

/* Centroid of a Polygon/MultiPolygon's first ring, as Leaflet [lat, lng]. */
function centroidOf(geom) {
  const ring = geom.type === 'MultiPolygon' ? geom.coordinates[0][0] : geom.coordinates[0];
  let x = 0, y = 0; const n = ring.length - 1;
  for (let i = 0; i < n; i++) { x += ring[i][0]; y += ring[i][1]; }
  return [y / n, x / n];
}
/* Up-to-2-char fallback badge for a project with no logo. */
function initials(name) {
  return (name || '').replace(/[^A-Za-z0-9 ]/g, ' ')
    .split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export default function ProjectAtlas() {
  const { mode } = useContext(SchematicContext);
  const [satellite, setSatellite] = useState(false); // basemap toggle: monochrome map vs imagery
  const [lpaOn, setLpaOn] = useState(() => Object.fromEntries(LPAS.map((l) => [l.key, l.on])));
  /* Overlay panels are dropdowns — open by default on desktop, collapsed on
     small screens so the map stays usable. */
  const [legendOpen, setLegendOpen] = useState(() => !window.matchMedia('(max-width: 640px)').matches);
  const [indexOpen, setIndexOpen] = useState(() => !window.matchMedia('(max-width: 640px)').matches);
  const [selected, setSelected] = useState(null); // selected project name -> drives the dashboard

  const mapEl = useRef(null);          // the <div> the map draws into
  const mapRef = useRef(null);         // the Leaflet map instance
  const tileRef = useRef(null);        // current basemap layer (so we can swap it)
  const layersByName = useRef({});     // name -> polygon layer, for the index fly-to
  const cityLayerRef = useRef(null);   // BBMP city outline layer
  const greaterLayerRef = useRef(null);// Bengaluru Urban (Greater) outline layer
  const lpaLayersRef = useRef({});     // LPA key -> LPA layer, for legend toggles
  const markersRef = useRef({});       // name -> logo-chip marker

  /* Derived numbers + grouped index, computed from the data (not hardcoded). */
  const { totalArea, nDone, nUC, groups } = useMemo(() => {
    const feats = sites.features;
    const by = (st) => feats
      .filter((f) => f.properties.status === st)
      .sort((a, b) => b.properties.area_acres - a.properties.area_acres);
    return {
      totalArea: feats.reduce((s, f) => s + (f.properties.area_acres || 0), 0),
      nDone: feats.filter((f) => f.properties.status === 'Completed').length,
      nUC: feats.filter((f) => f.properties.status === 'Under Construction').length,
      groups: [
        { status: 'Under Construction', items: by('Under Construction') },
        { status: 'Completed', items: by('Completed') },
      ],
    };
  }, []);

  /* Create the map once, draw the sites, frame them. */
  useEffect(() => {
    if (mapRef.current || !mapEl.current) return;
    const map = L.map(mapEl.current, { zoomControl: true });
    mapRef.current = map;

    /* Context outlines, non-interactive and drawn under the sites: the dashed
       Greater-Bengaluru (Urban district) and the solid BBMP city line. Their
       colours are set per-theme in the mode effect below. */
    greaterLayerRef.current = L.geoJSON(greaterBoundary, { interactive: false }).addTo(map);
    cityLayerRef.current = L.geoJSON(cityBoundary, { interactive: false }).addTo(map);

    /* BMRDA LPA overlays (digitized from the official LPA map) — also under the
       sites, all hidden by default and toggled from the legend. */
    for (const l of LPAS) {
      const feat = lpaBoundaries.features.find((f) => f.properties.name === l.key);
      if (!feat) continue;
      const ll = L.geoJSON(feat, {
        style: { color: l.color, weight: 1.2, opacity: 0.8, fillColor: l.color, fillOpacity: 0.08 },
        onEachFeature: (f, lyr) => {
          const p = f.properties;
          lyr.bindTooltip(
            `<b>${l.label}</b><br/>Official area: ${p.official_km2.toLocaleString()} km²` +
            `<br/><i>Digitized from BMRDA LPA map — approximate</i>`,
            { sticky: true }
          );
        },
      });
      lpaLayersRef.current[l.key] = ll;
      if (l.on) ll.addTo(map);
    }

    const styleFor = (f) => {
      const s = STATUS[f.properties.status] || STATUS.Completed;
      return { color: s.ink, weight: 2, fillColor: s.fill, fillOpacity: 0.1 };
    };

    const layer = L.geoJSON(sites, {
      style: styleFor,
      onEachFeature: (f, lyr) => {
        const p = f.properties;
        const s = STATUS[p.status] || STATUS.Completed;
        layersByName.current[p.name] = lyr;
        lyr.bindTooltip(p.name, { sticky: true });
        lyr.bindPopup(
          `<div class="pa-pt">${p.name}</div>` +
          `<span class="pa-badge" style="background:${s.fill}22;color:${s.ink}">${p.status}</span>` +
          `<div class="pa-area">Area: <b>${p.area_acres}</b> acres</div>`
        );
        lyr.on('mouseover', () => lyr.setStyle({ weight: 2.6, fillOpacity: 0.68 }));
        lyr.on('mouseout', () => lyr.setStyle(styleFor(f)));
      },
    }).addTo(map);

    /* Logo-chip markers at each site centroid — the primary way to identify and
       select a project. White chip with a status-colour ring; falls back to
       initials when a project has no logo (or the logo image fails to load). */
    sites.features.forEach((f) => {
      const p = f.properties;
      const s = STATUS[p.status] || STATUS.Completed;
      const icon = L.divIcon({
        className: 'pa-chip-wrap',
        html: `<div class="pa-chip" style="--ring:${s.fill}" data-i="${initials(p.name)}"></div>`,
        iconSize: [40, 40], iconAnchor: [20, 20],
      });
      const mk = L.marker(centroidOf(f.geometry), { icon, riseOnHover: true }).addTo(map);
      mk.bindTooltip(p.name, { direction: 'top', offset: [0, -20] });
      mk.on('click', () => {
        setSelected(p.name);
        const lyr = layersByName.current[p.name];
        if (lyr) map.flyToBounds(lyr.getBounds(), { padding: [60, 60], maxZoom: 17 });
      });
      markersRef.current[p.name] = mk;
    });

    // Frame the greater-Bengaluru extent plus any outlying sites, so every site shows.
    map.fitBounds(greaterLayerRef.current.getBounds().extend(layer.getBounds()), { padding: [20, 20] });

    return () => {
      map.remove();
      mapRef.current = null;
      tileRef.current = null;
      cityLayerRef.current = null;
      greaterLayerRef.current = null;
      lpaLayersRef.current = {};
      layersByName.current = {};
      markersRef.current = {};
    };
  }, []);

  /* Show/hide LPA layers from the legend toggles. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const l of LPAS) {
      const lyr = lpaLayersRef.current[l.key];
      if (!lyr) continue;
      if (lpaOn[l.key] && !map.hasLayer(lyr)) lyr.addTo(map);
      if (!lpaOn[l.key] && map.hasLayer(lyr)) map.removeLayer(lyr);
    }
  }, [lpaOn]);

  /* Swap the basemap whenever the theme or the satellite toggle changes. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = satellite
      ? L.tileLayer(SATELLITE.url, { maxZoom: 20, maxNativeZoom: 19, attribution: SATELLITE.attribution })
      : L.tileLayer(TILES[mode] || TILES.light, { maxZoom: 20, maxNativeZoom: 16, attribution: ESRI_ATTRIBUTION });
    tileRef.current.addTo(map);
    tileRef.current.bringToBack();

    /* Re-tint the context outlines so they read on the current basemap
       (bright on satellite imagery, theme-slate on the monochrome map). */
    const bc = satellite
      ? { city: '#ffffff', greater: '#e2e8f0' }
      : (mode === 'dark' ? { city: '#9fb0c6', greater: '#6b7d96' } : { city: '#475569', greater: '#7c8ba1' });
    if (cityLayerRef.current) cityLayerRef.current.setStyle({ color: bc.city, weight: 1.6, opacity: 0.9, fillColor: bc.city, fillOpacity: satellite ? 0.03 : 0.05 });
    if (greaterLayerRef.current) greaterLayerRef.current.setStyle({ color: bc.greater, weight: 1.3, opacity: 0.8, dashArray: '7 5', fill: false });
  }, [mode, satellite]);

  /* Index click -> the map flies to that site and opens its popup. */
  const flyTo = (name) => {
    const map = mapRef.current;
    const lyr = layersByName.current[name];
    if (!map || !lyr) return;
    map.flyToBounds(lyr.getBounds(), { padding: [60, 60], maxZoom: 17 });
    lyr.openPopup();
  };

  const textClass = `text-${mode === 'light' ? 'dark' : 'light'}`;

  /* Dashboard data for the currently selected project (metrics are placeholders
     from projectMeta.json until real figures are filled in). */
  const selectedFeature = selected ? sites.features.find((f) => f.properties.name === selected) : null;
  const meta = selected ? (projectMeta[selected] || {}) : {};
  const selStatus = selectedFeature ? (STATUS[selectedFeature.properties.status] || STATUS.Completed) : null;
  const metrics = selectedFeature ? [
    { label: 'Land area', value: `${selectedFeature.properties.area_acres} acres` },
    { label: 'No. of units', value: meta.units ?? '—' },
    { label: 'No. of towers', value: meta.towers ?? '—' },
    { label: 'Unit types', value: meta.unitTypes || '—' },
    { label: 'Building height', value: meta.heightM ? `${meta.heightM} m` : '—' },
    { label: 'Possession', value: meta.possession || '—' },
  ] : [];

  return (
    <div className="project-atlas" data-bs-theme={mode}>
      <div className="container py-4">
        <p className="pa-brand">Assetz &middot; Project Atlas</p>
        <h1 className={`${textClass} pa-title`}>Portfolio Map</h1>
        <p className="pa-lede">
          An interactive atlas of Assetz developments I&rsquo;ve worked on in project management &mdash; each site drawn to its real boundary, colour-coded by delivery
          status, with areas computed directly from the mapped geometry.
        </p>
        <div className="pa-stats">
          <span className="pa-stat"><b>{sites.features.length}</b> developments</span>
          <span className="pa-stat"><b>{totalArea.toLocaleString(undefined, { maximumFractionDigits: 1 })}</b> acres mapped</span>
          <span className="pa-stat"><b>{nDone}</b> completed</span>
          <span className="pa-stat"><b>{nUC}</b> under construction</span>
        </div>
      </div>

      <div className="container py-4 pa-mapwrap">
        <div ref={mapEl} className="pa-map" />

        <div className="pa-legend">
          <button
            type="button"
            className="pa-panel-hd"
            onClick={() => setLegendOpen((o) => !o)}
            aria-expanded={legendOpen}
          >
            <span>Legend</span>
            <span className={`pa-chev${legendOpen ? ' open' : ''}`}>▾</span>
          </button>
          {legendOpen && (<>
          <div className="pa-row">
            <span className="pa-sw" style={{ background: STATUS.Completed.fill }} /> Completed
            <span className="pa-n">{nDone}</span>
          </div>
          <div className="pa-row">
            <span className="pa-sw" style={{ background: STATUS['Under Construction'].fill }} /> Under Construction
            <span className="pa-n">{nUC}</span>
          </div>
          <div className="pa-row" style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--pa-line)' }}>
            <span style={{ display: 'inline-block', width: 16, borderTop: '2px solid #8aa0bd' }} /> BBMP city
          </div>
          <div className="pa-row">
            <span style={{ display: 'inline-block', width: 16, borderTop: '2px dashed #8aa0bd' }} /> Greater Bengaluru
          </div>
          <div className="pa-row" style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid var(--pa-line)' }}>
            <span className="pa-zh">Local Planning Areas</span>
          </div>
          {LPAS.map((l) => (
            <button
              type="button"
              key={l.key}
              className={`pa-zrow${lpaOn[l.key] ? '' : ' off'}`}
              onClick={() => setLpaOn((s) => ({ ...s, [l.key]: !s[l.key] }))}
              title={`${lpaOn[l.key] ? 'Hide' : 'Show'} LPA layer`}
            >
              <span
                className="pa-zsw"
                style={{ borderColor: l.color, background: lpaOn[l.key] ? `${l.color}33` : 'transparent' }}
              />
              {l.label}
            </button>
          ))}
          <div className="pa-znote">
            Digitized from the official BMRDA LPA map (1:125,000) — approximate. BDA core omitted
            (already shown as BBMP / Greater Bengaluru above).
          </div>
          <button
            type="button"
            onClick={() => setSatellite((s) => !s)}
            style={{
              marginTop: 8, width: '100%', padding: '5px 8px', fontSize: 12,
              borderRadius: 7, border: '1px solid var(--pa-line)',
              background: 'transparent', color: 'var(--pa-ink)', cursor: 'pointer',
            }}
          >
            {satellite ? 'Map view' : 'Satellite view'}
          </button>
          </>)}
        </div>

        <div className={`pa-index${indexOpen ? ' open' : ''}`}>
          <button
            type="button"
            className="pa-panel-hd pa-index-hd"
            onClick={() => setIndexOpen((o) => !o)}
            aria-expanded={indexOpen}
          >
            <span>Project Index</span>
            <span className={`pa-chev${indexOpen ? ' open' : ''}`}>▾</span>
          </button>
          {indexOpen && (
          <div className="pa-index-list">
            {groups.map((g) => (g.items.length ? (
              <div key={g.status}>
                <div className="pa-grp">{g.status} ({g.items.length})</div>
                {g.items.map((f) => (
                  <button
                    type="button"
                    className="pa-item"
                    key={f.properties.name}
                    onClick={() => { setSelected(f.properties.name); flyTo(f.properties.name); }}
                  >
                    <span className="pa-idot" style={{ background: STATUS[f.properties.status]?.fill }} />
                    <span className="pa-nm">{f.properties.name}</span>
                    <span className="pa-ar">{f.properties.area_acres} ac</span>
                  </button>
                ))}
              </div>
            ) : null))}
          </div>
          )}
        </div>
      </div>

      {/* ---- Metrics dashboard ---- */}
      <div className="container py-4 pa-dash">
        <div className="pa-dash-tiles">
          <div className="pa-tile"><b>{sites.features.length}</b><span>Developments</span></div>
          <div className="pa-tile"><b>{totalArea.toLocaleString(undefined, { maximumFractionDigits: 0 })}</b><span>Acres mapped</span></div>
          <div className="pa-tile"><b>{nDone}</b><span>Completed</span></div>
          <div className="pa-tile"><b>{nUC}</b><span>Under construction</span></div>
        </div>

        {selectedFeature ? (
          <div className="pa-detail">
            <div className="pa-detail-head">
              {meta.logo
                ? <img className="pa-detail-logo" src={meta.logo} alt={`${selected} logo`} />
                : <div className="pa-detail-logo pa-detail-logo--ph">{initials(selected)}</div>}
              <div>
                <div className={`pa-detail-name text-${mode === 'light' ? 'dark' : 'light'}`}>{selected}</div>
                <span className="pa-badge2" style={{ background: `${selStatus.fill}22`, color: selStatus.ink }}>
                  {selectedFeature.properties.status}
                </span>
              </div>
            </div>
            <div className="pa-metrics">
              {metrics.map((m) => (
                <div className="pa-metric" key={m.label}>
                  <span className="pa-metric-l">{m.label}</span>
                  <span className="pa-metric-v">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="pa-amen">
              <div className="pa-amen-hd">Amenities</div>
              {meta.amenities && meta.amenities.length
                ? <ul className="pa-amen-list">{meta.amenities.map((a) => <li key={a}>{a}</li>)}</ul>
                : <span className="pa-ph">Placeholder — add amenities in projectMeta.json</span>}
            </div>
            <p className="pa-ph pa-dash-note">
              Metrics are placeholders — fill in real figures per project in <code>projectMeta.json</code>.
            </p>
          </div>
        ) : (
          <div className="pa-detail pa-detail--empty">
            Click a project logo on the map (or a name in the index) to see its metrics.
          </div>
        )}
      </div>
    </div>
  );
}
