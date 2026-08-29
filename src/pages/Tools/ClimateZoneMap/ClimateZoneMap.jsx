import React, { useState, useMemo, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import { MapContainer, TileLayer, ImageOverlay, CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import koppenPng from './koppenIndia.png';
import koppenWorldPng from './koppenWorld.png';
import nbcPng from './nbcIndia.png';
import nbcGrid from './nbcGrid.json';
import ensCities from './ensCities.json';
import koppenGrid from './koppenGrid.json';
import cityData from './cities.json';

// Köppen-Geiger climate zone map for India.
//
// The zone shading is the Beck et al. (2023) 1-km Köppen-Geiger classification
// for the 1991-2020 normal period, cropped to the Indian subcontinent and
// reprojected from equirectangular (EPSG:4326) to Web Mercator (EPSG:3857) so
// that Leaflet's ImageOverlay lines up. Skipping that reprojection would put
// the overlay up to ~92 km out of position at mid-latitudes.
//
// Click-to-identify reads from koppenGrid.json, a run-length-encoded copy of the
// same raster at ~2.5 km, kept in equirectangular form so the lat/lng -> cell
// maths stays trivial. Display PNG and lookup grid come from the same source
// array, so what you see and what you click always agree.
//
// City tiers are the CREDAI 2025 Tier I/II/III list; each city's Köppen code is
// sampled from the full 1-km raster at its coordinates.
//
// Data: Beck, H.E. et al. High-resolution (1 km) Köppen-Geiger maps for
// 1901-2099 based on constrained CMIP6 projections. Scientific Data 10, 724
// (2023). CC BY 4.0.

const PAPER_URL = 'https://doi.org/10.1038/s41597-023-02549-6';
const DATA_URL = 'https://www.gloh2o.org/koppen/';

// CARTO's raster basemaps now require an API key; without one the tiles are
// served with a repeating "API key required" watermark. The key is free (no
// account needed, 5M tiles/month) from https://carto.com/basemaps/apikey and
// goes in .env as VITE_CARTO_KEY. Without it the map still works, just
// watermarked, so the site degrades rather than breaks.
const CARTO_KEY = import.meta.env.VITE_CARTO_KEY;
const cartoTiles = (style) =>
  `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png` +
  (CARTO_KEY ? `?key=${CARTO_KEY}` : '');

const INDIA_CENTER = [22.0, 80.0];
const INDIA_ZOOM = 5;
const WORLD_CENTER = [20.0, 10.0];
const WORLD_ZOOM = 2;

const INDIA_BOUNDS = [
  [koppenGrid.bounds.south, koppenGrid.bounds.west],
  [koppenGrid.bounds.north, koppenGrid.bounds.east],
];

// The world overlay is drawn in Web Mercator, which cannot represent the poles.
// It therefore spans Leaflet's standard +/-85.0511 degree cutoff rather than
// +/-90. The world lookup grid stays in equirectangular form over the full
// +/-90, so its bounds are read from the JSON instead.
const WORLD_MERCATOR_LAT = 85.0511287798066;
const WORLD_BOUNDS = [
  [-WORLD_MERCATOR_LAT, -180],
  [WORLD_MERCATOR_LAT, 180],
];

// The full 30-class Köppen-Geiger legend with the RGB colours used in
// Beck et al. (2023). Only classes actually occurring in the map extent are
// rendered in the legend panel - the rest are kept so click lookups never
// fall through.
// NBC / ECBC building-design climate zones, built from district data rather
// than traced from a picture: the ECBC 2020 district climate zone table
// (ecbc.in) mapped onto LGD district boundaries, with the 68 cities in
// Eco-Niwas Samhita 2018 Annexure 2 applied as authoritative overrides.
// Districts created after 2020 inherit their geographic parent's zone.
// Colours match the ENS 2018 figure legend. Reproduces all 68 official city
// zones exactly, at ~2.3 km per pixel on real administrative boundaries.
const NBC = {
  1: ['Hot-Dry', '#cc0000'],
  2: ['Warm-Humid', '#f0a030'],
  3: ['Temperate', '#f5a0c8'],
  4: ['Cold', '#29a8d8'],
  5: ['Composite', '#ede0b0'],
};

const KOPPEN = {
  1: ['Af', 'Tropical, rainforest', '#0000ff'],
  2: ['Am', 'Tropical, monsoon', '#0078ff'],
  3: ['Aw', 'Tropical, savannah', '#46aafa'],
  4: ['BWh', 'Arid, desert, hot', '#ff0000'],
  5: ['BWk', 'Arid, desert, cold', '#ff9696'],
  6: ['BSh', 'Arid, steppe, hot', '#f5a500'],
  7: ['BSk', 'Arid, steppe, cold', '#ffdc64'],
  8: ['Csa', 'Temperate, dry summer, hot summer', '#ffff00'],
  9: ['Csb', 'Temperate, dry summer, warm summer', '#c8c800'],
  10: ['Csc', 'Temperate, dry summer, cold summer', '#969600'],
  11: ['Cwa', 'Temperate, dry winter, hot summer', '#96ff96'],
  12: ['Cwb', 'Temperate, dry winter, warm summer', '#64c864'],
  13: ['Cwc', 'Temperate, dry winter, cold summer', '#329632'],
  14: ['Cfa', 'Temperate, no dry season, hot summer', '#c8ff50'],
  15: ['Cfb', 'Temperate, no dry season, warm summer', '#64ff50'],
  16: ['Cfc', 'Temperate, no dry season, cold summer', '#32c800'],
  17: ['Dsa', 'Cold, dry summer, hot summer', '#ff00ff'],
  18: ['Dsb', 'Cold, dry summer, warm summer', '#c800c8'],
  19: ['Dsc', 'Cold, dry summer, cold summer', '#963296'],
  20: ['Dsd', 'Cold, dry summer, very cold winter', '#966496'],
  21: ['Dwa', 'Cold, dry winter, hot summer', '#aaafff'],
  22: ['Dwb', 'Cold, dry winter, warm summer', '#5a78dc'],
  23: ['Dwc', 'Cold, dry winter, cold summer', '#4b50b4'],
  24: ['Dwd', 'Cold, dry winter, very cold winter', '#320087'],
  25: ['Dfa', 'Cold, no dry season, hot summer', '#00ffff'],
  26: ['Dfb', 'Cold, no dry season, warm summer', '#37c8ff'],
  27: ['Dfc', 'Cold, no dry season, cold summer', '#007d7d'],
  28: ['Dfd', 'Cold, no dry season, very cold winter', '#00465f'],
  29: ['ET', 'Polar, tundra', '#b2b2b2'],
  30: ['EF', 'Polar, frost', '#666666'],
};

// Expand the run-length-encoded lookup grid into a flat byte array.
// Format is "value,runLength;value,runLength;..." read left-to-right,
// top-to-bottom. Done once and memoised - roughly 1.6 million cells.
// Great-circle distance in kilometres.
const haversineKm = (lat1, lng1, lat2, lng2) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const decodeGrid = ({ width, height, rle }) => {
  const out = new Uint8Array(width * height);
  let pos = 0;
  for (const run of rle.split(';')) {
    const comma = run.indexOf(',');
    const value = +run.slice(0, comma);
    const length = +run.slice(comma + 1);
    if (value !== 0) out.fill(value, pos, pos + length);
    pos += length;
  }
  return out;
};

const ClimateZoneMap = () => {
  const { mode } = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  const [scope, setScope] = useState('india'); // 'india' | 'world'
  const [opacity, setOpacity] = useState(0.75);
  const [showTier1, setShowTier1] = useState(true);
  const [showTier2, setShowTier2] = useState(true);
  const [activeCode, setActiveCode] = useState(null); // legend filter
  const [probe, setProbe] = useState(null); // click-to-identify result
  const [query, setQuery] = useState('');
  const [worldData, setWorldData] = useState(null);
  const [loadingWorld, setLoadingWorld] = useState(false);

  const indiaGrid = useMemo(() => decodeGrid(koppenGrid), []);

  // The world lookup grid is 6.5 million cells, so it is code-split and only
  // fetched the first time someone switches to the world view. That keeps the
  // default India view light.
  useEffect(() => {
    if (scope !== 'world' || worldData || loadingWorld) return;
    let cancelled = false;
    setLoadingWorld(true);
    import('./koppenWorldGrid.json')
      .then((mod) => {
        const meta = mod.default || mod;
        if (!cancelled) setWorldData({ meta, grid: decodeGrid(meta) });
      })
      .finally(() => {
        if (!cancelled) setLoadingWorld(false);
      });
    return () => {
      cancelled = true;
    };
  }, [scope, worldData, loadingWorld]);

  const isWorld = scope === 'world';
  const isNbc = scope === 'nbc';
  const nbcDecoded = useMemo(() => decodeGrid(nbcGrid), []);

  const grid = isWorld ? worldData?.grid ?? null : isNbc ? nbcDecoded : indiaGrid;
  const gridMeta = isWorld ? worldData?.meta ?? null : isNbc ? nbcGrid : koppenGrid;
  const table = isNbc ? NBC : KOPPEN;

  // Which Köppen classes actually occur inside the mapped extent, ordered by
  // how much of the map they cover, so the legend reads most-common first.
  const presentClasses = useMemo(() => {
    if (!grid) return [];
    const counts = new Map();
    for (let i = 0; i < grid.length; i++) {
      const v = grid[i];
      if (v !== 0) counts.set(v, (counts.get(v) || 0) + 1);
    }
    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([value, n]) => ({
        value,
        code: isNbc ? '' : table[value][0],
        label: isNbc ? table[value][0] : table[value][1],
        colour: isNbc ? table[value][1] : table[value][2],
        share: (n / total) * 100,
      }));
  }, [grid, isNbc, table]);

  // Sample the lookup grid at a latitude/longitude. Returns null outside the
  // mapped extent or over sea, where the source raster has no land class.
  const sampleGrid = (g, meta, lat, lng) => {
    if (!g || !meta) return null;
    const { west, east, south, north } = meta.bounds;
    // Leaflet reports longitudes outside -180..180 once the user pans across
    // the date line, so wrap before sampling.
    const wrapped = ((((lng + 180) % 360) + 360) % 360) - 180;
    if (lat < south || lat > north || wrapped < west || wrapped > east) return null;
    const col = Math.min(meta.width - 1, Math.floor(((wrapped - west) / (east - west)) * meta.width));
    const row = Math.min(meta.height - 1, Math.floor(((north - lat) / (north - south)) * meta.height));
    const v = g[row * meta.width + col];
    return v === 0 ? null : v;
  };

  const classAt = (lat, lng) => sampleGrid(grid, gridMeta, lat, lng);

  const cities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cityData.cities.filter((c) => {
      if (c.t === 1 && !showTier1) return false;
      if (c.t === 2 && !showTier2) return false;
      if (activeCode && c.k !== activeCode) return false;
      if (q && !(c.n.toLowerCase().includes(q) || c.s.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, showTier1, showTier2, activeCode]);

  const colourForCode = (code) => {
    const hit = Object.values(KOPPEN).find((k) => k[0] === code);
    return hit ? hit[2] : '#888888';
  };

  // Listens for clicks on the map and reports the climate zone under the cursor.
  const ClickProbe = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        // Report both systems regardless of which layer is showing, so the two
        // can be compared without switching. NBC only covers India.
        const kSrc = isWorld ? worldData?.grid : indiaGrid;
        const kMeta = isWorld ? worldData?.meta : koppenGrid;
        const k = sampleGrid(kSrc, kMeta, lat, lng);
        let n = sampleGrid(nbcDecoded, nbcGrid, lat, lng);
        // The traced map is only accurate to roughly a district, so where an
        // official Eco-Niwas Samhita city sits within 25 km, prefer its
        // published zone over the pixel. This matters most for Bengaluru, the
        // only city ENS lists as Temperate, whose zone is a very small patch.
        let nOfficial = null;
        for (const c of ensCities.cities) {
          if (haversineKm(lat, lng, c.lat, c.lng) <= 25) {
            nOfficial = c;
            n = c.z;
            break;
          }
        }
        setProbe({
          lat,
          lng,
          kCode: k ? KOPPEN[k][0] : null,
          kLabel: k ? KOPPEN[k][1] : null,
          kColour: k ? KOPPEN[k][2] : 'transparent',
          nLabel: n ? NBC[n][0] : null,
          nColour: n ? NBC[n][1] : 'transparent',
          nSource: nOfficial ? `official — ${nOfficial.n}, ENS 2018` : 'digitised from the ENS map',
        });
      },
    });
    return null;
  };

  // Recentres the map whenever the India/World scope changes. Leaflet owns the
  // view once it is created, so this has to run through the map instance
  // rather than by re-rendering MapContainer with new props.
  const ScopeView = ({ target }) => {
    const map = useMap();
    useEffect(() => {
      if (target === 'world') {
        map.setMinZoom(2);
        map.setView(WORLD_CENTER, WORLD_ZOOM);
      } else {
        map.setMinZoom(4);
        map.setView(INDIA_CENTER, INDIA_ZOOM);
      }
    }, [target, map]);
    return null;
  };

  const tileUrl = cartoTiles(mode === 'dark' ? 'dark_all' : 'light_all');

  return (
    <div className="container">
      <div className="row gx-4 gb-4" data-bs-theme={mode}>
        <h1 className={`${textColorClass} d-flex mb-2`}>Köppen Climate Zone Map</h1>
        <p className={textColorClass}>
          Climate classification zones from the peer-reviewed Beck et&nbsp;al. (2023)
          Köppen-Geiger dataset for the 1991–2020 normal period. Switch between a detailed
          1&nbsp;km view of the Indian subcontinent and a 0.1° world view. Click anywhere on
          the map to identify the zone, or use the city markers for the CREDAI Tier&nbsp;I and
          Tier&nbsp;II cities.
        </p>

        {/* ---------------- controls ---------------- */}
        <div className={`card bg-${mode} ${textColorClass} border mb-3`}>
          <div className="card-body py-3">
            <div className="row g-3 align-items-center">
              <div className="col-sm-3">
                <div className="form-label mb-1 small">Layer</div>
                <div className="btn-group btn-group-sm w-100" role="group" aria-label="Map layer">
                  {[
                    ['india', 'India'],
                    ['world', 'World'],
                    ['nbc', 'NBC'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      className={`btn btn-${scope === key ? 'primary' : 'outline-primary'}`}
                      onClick={() => { setScope(key); setActiveCode(null); }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-sm-3">
                <label htmlFor="czm-opacity" className="form-label mb-1 small">
                  Zone layer opacity — {Math.round(opacity * 100)}%
                </label>
                <input
                  id="czm-opacity"
                  type="range"
                  className="form-range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                />
              </div>

              <div className="col-sm-3">
                <label htmlFor="czm-search" className="form-label mb-1 small">
                  Find a city
                </label>
                <input
                  id="czm-search"
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="e.g. Jaipur, or Kerala"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="col-sm-3">
                <div className="form-label mb-1 small">Show markers</div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="czm-t1"
                    checked={showTier1}
                    onChange={(e) => setShowTier1(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="czm-t1">
                    Tier I
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="czm-t2"
                    checked={showTier2}
                    onChange={(e) => setShowTier2(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="czm-t2">
                    Tier II
                  </label>
                </div>
              </div>
            </div>

            {activeCode && (
              <div className="mt-2 small">
                Showing only <strong>{activeCode}</strong> cities.{' '}
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 align-baseline"
                  onClick={() => setActiveCode(null)}
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- map ---------------- */}
        <div
          className="border rounded overflow-hidden mb-3"
          style={{ height: '640px', position: 'relative' }}
        >
          {/* legend */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1000,
              width: 232,
              maxHeight: 'calc(100% - 20px)',
            }}
          >
            <div className={`card bg-${mode} ${textColorClass} border shadow-sm`}>
              <div className="px-2 py-2 border-bottom" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                {isNbc ? 'NBC 2016 zones' : 'Köppen-Geiger zones'}
                <span className="fw-normal" style={{ opacity: 0.7 }}>
                  {' '}
                  — {isWorld ? 'world' : 'India'}
                </span>
              </div>
              <div style={{ maxHeight: 320, overflowY: 'auto' }} className="px-2 py-1">
                {loadingWorld && (
                  <div className="small px-1 py-2" style={{ opacity: 0.75 }}>
                    Loading world data…
                  </div>
                )}
                {presentClasses.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setActiveCode(activeCode === c.code ? null : c.code)}
                    className="btn btn-sm w-100 text-start px-1 py-1 d-flex align-items-center gap-2 border-0"
                    style={{
                      fontSize: '0.72rem',
                      background: activeCode === c.code ? 'rgba(125,125,125,0.28)' : 'transparent',
                      color: 'inherit',
                    }}
                    title={`${c.label} — ${c.share.toFixed(1)}% of the mapped area`}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: 14,
                        height: 14,
                        flex: '0 0 14px',
                        background: c.colour,
                        border: '1px solid rgba(0,0,0,0.35)',
                        borderRadius: 2,
                      }}
                    />
                    {!isNbc && <span style={{ fontWeight: 600, flex: '0 0 34px' }}>{c.code}</span>}
                    <span className="text-truncate">
                      {isNbc ? c.label : c.label.replace(/^[^,]+, /, '')}
                    </span>
                  </button>
                ))}
              </div>
              <div className="px-2 py-1 border-top" style={{ fontSize: '0.66rem', opacity: 0.75 }}>
                {isNbc
                  ? 'Black-ringed dots are official ENS 2018 values.'
                  : 'Click a zone to filter the city markers.'}
              </div>
            </div>
          </div>

          {/* click-to-identify readout */}
          {probe && (
            <div style={{ position: 'absolute', bottom: 20, left: 10, zIndex: 1000, width: 268 }}>
              <div className={`card bg-${mode} ${textColorClass} border shadow-sm`}>
                <div className="card-body py-2 px-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="small" style={{ opacity: 0.75 }}>
                      {probe.lat.toFixed(4)}°N, {probe.lng.toFixed(4)}°E
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-sm"
                      style={{ fontSize: '0.6rem' }}
                      aria-label="Close"
                      onClick={() => setProbe(null)}
                    />
                  </div>
                  {probe.kCode || probe.nLabel ? (
                    <div className="mt-1">
                      <div className="d-flex align-items-center gap-2">
                        <span
                          style={{
                            display: 'inline-block',
                            width: 18,
                            height: 18,
                            flex: '0 0 18px',
                            background: probe.kColour,
                            border: '1px solid rgba(0,0,0,0.35)',
                            borderRadius: 3,
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, lineHeight: 1.1 }}>
                            Köppen {probe.kCode || '—'}
                          </div>
                          <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                            {probe.kLabel || 'no land data here'}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <span
                          style={{
                            display: 'inline-block',
                            width: 18,
                            height: 18,
                            flex: '0 0 18px',
                            background: probe.nColour,
                            border: '1px solid rgba(0,0,0,0.35)',
                            borderRadius: 3,
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, lineHeight: 1.1 }}>
                            NBC {probe.nLabel || '—'}
                          </div>
                          <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                            {probe.nLabel ? probe.nSource : 'outside India'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="small mt-1">
                      No land data at this point (sea, or outside the mapped area)
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <MapContainer
            center={INDIA_CENTER}
            zoom={INDIA_ZOOM}
            minZoom={4}
            maxZoom={11}
            worldCopyJump
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> | Climate data: Beck et al. (2023)'
              url={tileUrl}
              subdomains="abcd"
            />
            <ImageOverlay
              key={scope}
              url={isWorld ? koppenWorldPng : isNbc ? nbcPng : koppenPng}
              bounds={isWorld ? WORLD_BOUNDS : INDIA_BOUNDS}
              opacity={opacity}
            />
            <ScopeView target={scope} />
            <ClickProbe />

            {isNbc &&
              ensCities.cities.map((c) => (
                <CircleMarker
                  key={`ens-${c.n}`}
                  center={[c.lat, c.lng]}
                  radius={6}
                  pathOptions={{
                    color: '#000',
                    weight: 2,
                    fillColor: NBC[c.z][1],
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: 170 }}>
                      <div style={{ fontWeight: 700 }}>{c.n}</div>
                      <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>
                        NBC Climate Zone
                      </div>
                      <hr style={{ margin: '6px 0' }} />
                      <div className="d-flex align-items-center gap-2">
                        <span
                          style={{
                            display: 'inline-block',
                            width: 16,
                            height: 16,
                            background: NBC[c.z][1],
                            border: '1px solid rgba(0,0,0,0.35)',
                            borderRadius: 2,
                          }}
                        />
                        <strong>{NBC[c.z][0]}</strong>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

            {!isNbc &&
              cities.map((c) => (
              <CircleMarker
                key={`${c.n}-${c.lat}`}
                center={[c.lat, c.lng]}
                radius={c.t === 1 ? 7 : 4}
                pathOptions={{
                  color: mode === 'dark' ? '#ffffff' : '#111111',
                  weight: c.t === 1 ? 2 : 1,
                  fillColor: colourForCode(c.k),
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div style={{ minWidth: 168 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.n}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>
                      {c.s} &middot; Tier {c.t === 1 ? 'I' : 'II'}
                    </div>
                    <hr style={{ margin: '6px 0' }} />
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          display: 'inline-block',
                          width: 16,
                          height: 16,
                          background: colourForCode(c.k),
                          border: '1px solid rgba(0,0,0,0.35)',
                          borderRadius: 2,
                        }}
                      />
                      <span style={{ fontWeight: 700 }}>{c.k}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', marginTop: 2 }}>{c.d}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: 4 }}>
                      {c.lat.toFixed(3)}°N, {c.lng.toFixed(3)}°E
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* ---------------- city table ---------------- */}
        <h2 className={`${textColorClass} h4 mt-2`}>
          Cities by climate zone{' '}
          <span className="fs-6 fw-normal" style={{ opacity: 0.7 }}>
            ({cities.length} shown)
          </span>
        </h2>
        <div className="table-responsive mb-4" style={{ maxHeight: 420, overflowY: 'auto' }}>
          <table className={`table table-sm table-${mode} table-bordered align-middle`}>
            <thead>
              <tr>
                <th scope="col">City</th>
                <th scope="col">State / UT</th>
                <th scope="col">Tier</th>
                <th scope="col">Köppen</th>
                <th scope="col">Climate</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={`row-${c.n}-${c.lat}`}>
                  <td>{c.n}</td>
                  <td>{c.s}</td>
                  <td>{c.t === 1 ? 'I' : 'II'}</td>
                  <td>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 12,
                        height: 12,
                        background: colourForCode(c.k),
                        border: '1px solid rgba(0,0,0,0.35)',
                        borderRadius: 2,
                        marginRight: 6,
                      }}
                    />
                    <strong>{c.k}</strong>
                  </td>
                  <td>{c.d}</td>
                </tr>
              ))}
              {cities.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-3" style={{ opacity: 0.7 }}>
                    No cities match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------- reading the codes ---------------- */}
        <h2 className={`${textColorClass} h4`}>Reading a Köppen code</h2>
        <p className={textColorClass}>
          Each code has two or three letters. The first is the broad climate group, the second
          describes the rainfall pattern, and the third — where present — describes summer or
          winter temperature.
        </p>
        <div className="table-responsive mb-4">
          <table className={`table table-sm table-${mode} table-bordered align-middle`}>
            <tbody>
              <tr>
                <th scope="row" style={{ width: '18%' }}>1st letter</th>
                <td>
                  <strong>A</strong> tropical &middot; <strong>B</strong> arid &middot;{' '}
                  <strong>C</strong> temperate &middot; <strong>D</strong> cold &middot;{' '}
                  <strong>E</strong> polar
                </td>
              </tr>
              <tr>
                <th scope="row">2nd letter</th>
                <td>
                  For <strong>A</strong>: f rainforest, m monsoon, w savannah. For{' '}
                  <strong>B</strong>: W desert, S steppe. For <strong>C</strong> and{' '}
                  <strong>D</strong>: f no dry season, s dry summer, w dry winter.
                </td>
              </tr>
              <tr>
                <th scope="row">3rd letter</th>
                <td>
                  For <strong>B</strong>: h hot, k cold. For <strong>C</strong> and{' '}
                  <strong>D</strong>: a hot summer, b warm summer, c cold summer, d very cold winter.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ---------------- notes ---------------- */}
        <div className={`card bg-${mode} ${textColorClass} border mb-4`}>
          <div className="card-body">
            <h3 className="h5">Notes and limitations</h3>
            <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
              <li>
                Zones reflect the <strong>1991–2020</strong> climate normal period. Earlier
                periods and future projections exist in the source dataset but are not shown here.
              </li>
              <li>
                In the India view, click-to-identify samples a ~2.5&nbsp;km grid, so readings
                within a couple of kilometres of a zone boundary can go either way. City markers
                are sampled from the finer 1&nbsp;km raster. The world view is 0.1° (~11&nbsp;km
                at the equator) and is intended for global context, not site-level work — use the
                India view for anything detailed on the subcontinent.
              </li>
              <li>
                The world overlay is drawn in Web Mercator and so stops at ±85.05° latitude.
                Antarctica is therefore clipped, as it is on any standard web map.
              </li>
              <li>
                The two systems answer different questions and will disagree. Köppen is a
                <em> climatological</em> scheme; NBC 2016 Part 11 classifies for building design.
                Bengaluru is Köppen <code>Aw</code> but NBC Temperate. Click anywhere to see both
                at once.
              </li>
              <li>
                <strong>The NBC layer follows district boundaries.</strong> NBC and ECBC assign a
                climate zone per district, so this layer is built the same way — the ECBC 2020
                district zone table mapped onto Local Government Directory district boundaries,
                rather than traced from a printed map. Edges are real administrative boundaries.
              </li>
              <li>
                The 68 cities listed in <em>Eco-Niwas Samhita 2018</em> Annexure&nbsp;2 are
                applied on top as authoritative overrides, and the layer reproduces
                <strong>all 68 exactly</strong>. They are also plotted as black-ringed dots.
                Districts created after 2020 — Rajasthan and Andhra Pradesh saw many — inherit the
                zone of the district they were carved from.
              </li>
              <li>
                Colours match the ENS&nbsp;2018 legend. Boundaries come from LGD data covering all
                785 districts, including Ladakh to its full northern extent. For a site near a
                district edge, confirm against NBC&nbsp;2016 Part&nbsp;11 or the BEE climate zone
                finder.
              </li>
              <li>
                City tiers follow the CREDAI 2025 Tier&nbsp;I/II/III list. Coordinates are city
                centres, so large metropolitan regions are represented by a single point.
              </li>
            </ul>
          </div>
        </div>

        <p className={`${textColorClass} small`}>
          Climate data:{' '}
          <a href={PAPER_URL} target="_blank" rel="noreferrer">
            Beck, H.E. et&nbsp;al. High-resolution (1&nbsp;km) Köppen-Geiger maps for 1901–2099
            based on constrained CMIP6 projections. <em>Scientific Data</em> 10, 724 (2023)
          </a>
          , available from{' '}
          <a href={DATA_URL} target="_blank" rel="noreferrer">
            GloH2O
          </a>{' '}
          under CC&nbsp;BY&nbsp;4.0. See also the{' '}
          <Link to="/resources/NBC/NBCPart11">NBC Part 11 — Approach to Sustainability</Link>{' '}
          reference.
        </p>
      </div>
    </div>
  );
};

export default ClimateZoneMap;
