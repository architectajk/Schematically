import React, { useContext, useEffect, useRef, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import sites from './assetzSites.json';
import cityBoundary from './bengaluruBoundary.json';
import greaterBoundary from './greaterBengaluruBoundary.json';
import './ProjectAtlas.css';

/* Status -> colour lookup (green = Completed, amber = Under Construction).
   amber + green survives colour-blindness where amber's usual partner red fails. */
const STATUS = {
  'Completed':          { fill: '#2f8f5b', ink: '#14532d' },
  'Under Construction': { fill: '#e08a1e', ink: '#8a4b0a' },
};

/* Muted monochrome basemaps so the coloured site boundaries are the only
   saturated thing on screen. Two variants, chosen by the site's dark/light mode. */
const TILES = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark:  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};

/* Free satellite/aerial imagery (Esri World Imagery). Google's own tiles need a
   paid Maps API key + billing and can't be embedded directly, so we use Esri —
   the standard no-key satellite basemap for Leaflet. */
const SATELLITE = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
};

export default function ProjectAtlas() {
  const { mode } = useContext(SchematicContext);
  const [satellite, setSatellite] = useState(false); // basemap toggle: monochrome map vs imagery

  const mapEl = useRef(null);          // the <div> the map draws into
  const mapRef = useRef(null);         // the Leaflet map instance
  const tileRef = useRef(null);        // current basemap layer (so we can swap it)
  const layersByName = useRef({});     // name -> polygon layer, for the index fly-to
  const cityLayerRef = useRef(null);   // BBMP city outline layer
  const greaterLayerRef = useRef(null);// Bengaluru Urban (Greater) outline layer

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

    const styleFor = (f) => {
      const s = STATUS[f.properties.status] || STATUS.Completed;
      return { color: s.ink, weight: 1.2, fillColor: s.fill, fillOpacity: 0.5 };
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

    // Frame the greater-Bengaluru extent plus any outlying sites, so every site shows.
    map.fitBounds(greaterLayerRef.current.getBounds().extend(layer.getBounds()), { padding: [20, 20] });

    return () => {
      map.remove();
      mapRef.current = null;
      tileRef.current = null;
      cityLayerRef.current = null;
      greaterLayerRef.current = null;
      layersByName.current = {};
    };
  }, []);

  /* Swap the basemap whenever the theme or the satellite toggle changes. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileRef.current) map.removeLayer(tileRef.current);
    tileRef.current = satellite
      ? L.tileLayer(SATELLITE.url, { maxZoom: 20, maxNativeZoom: 19, attribution: SATELLITE.attribution })
      : L.tileLayer(TILES[mode] || TILES.light, { maxZoom: 20, subdomains: 'abcd', attribution: '&copy; OpenStreetMap &copy; CARTO' });
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

  return (
    <div className="project-atlas" data-bs-theme={mode}>
      <div className="container py-4">
        <p className="pa-brand">Assetz &middot; Project Atlas</p>
        <h1 className={`${textClass} pa-title`}>Portfolio Map</h1>
        <p className="pa-lede">
          An interactive atlas of Assetz developments I&rsquo;ve worked on in project
          management &mdash; each site drawn to its real boundary, colour-coded by delivery
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
        </div>

        <div className="pa-index">
          <div className="pa-index-hd">Project Index</div>
          <div className="pa-index-list">
            {groups.map((g) => (g.items.length ? (
              <div key={g.status}>
                <div className="pa-grp">{g.status} ({g.items.length})</div>
                {g.items.map((f) => (
                  <button
                    type="button"
                    className="pa-item"
                    key={f.properties.name}
                    onClick={() => flyTo(f.properties.name)}
                  >
                    <span className="pa-idot" style={{ background: STATUS[f.properties.status]?.fill }} />
                    <span className="pa-nm">{f.properties.name}</span>
                    <span className="pa-ar">{f.properties.area_acres} ac</span>
                  </button>
                ))}
              </div>
            ) : null))}
          </div>
        </div>
      </div>
    </div>
  );
}
