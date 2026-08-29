import React, { useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import stationData from './stations.json';

// India weather file finder for Ladybug/Honeybee energy simulation.
//
// Every EnergyPlus simulation needs an EPW weather file, and Honeybee's
// "HB Construction Set by Climate" component additionally needs an ASHRAE
// climate zone to pick code-recommended constructions. This tool answers both
// from one click on the map.
//
// Station data comes from climate.onebuilding.org (Lawrie & Crawley), whose
// per-region KML publishes, for each station: the ASHRAE HOF 2025 climate zone,
// CDD10 and HDD18 degree-days, 99%/1% design temperatures, coordinates and the
// EPW download URL. 443 Indian stations are included - 59 from the ISHRAE 2014
// dataset (created by White Box Technologies for ISHRAE with BEE support) and
// 384 more from the TMYx dataset.
//
// Köppen codes are sampled from the same Beck et al. (2023) 1-km raster used by
// the Climate Zone Map tool, so the two tools agree.

const ONEBUILDING = 'https://climate.onebuilding.org/';
const LADYBUG_EPWMAP = 'https://www.ladybug.tools/epwmap/';
const ASHRAE_169 = 'https://www.ashrae.org/technical-resources/bookstore/standard-169-climatic-data-for-building-design-standards';
const KOPPEN_PAPER = 'https://doi.org/10.1038/s41597-023-02549-6';
const HB_COMPONENT = 'https://docs.ladybug.tools/hb-energy-primer/components/0_basicproperties/construction_set_by_climate';

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

// ASHRAE 169 thermal zones, hot to cold. Zone 0 was added in the 2020 revision.
const ZONE_COLOURS = {
  0: '#7f0000',
  1: '#d7301f',
  2: '#ef6548',
  3: '#fdbb84',
  4: '#c7e9b4',
  5: '#7fcdbb',
  6: '#41b6c4',
  7: '#2c7fb8',
  8: '#253494',
};
const ZONE_LABELS = {
  0: 'Extremely Hot',
  1: 'Very Hot',
  2: 'Hot',
  3: 'Warm',
  4: 'Mixed',
  5: 'Cool',
  6: 'Cold',
  7: 'Very Cold',
  8: 'Subarctic / Arctic',
};

const VINTAGES = ['2019', '2016', '2013', '2010', '2007', '2004', 'pre_1980'];
const CONSTR_TYPES = ['SteelFramed', 'WoodFramed', 'Mass', 'Metal Building'];

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

const WeatherFileFinder = () => {
  const { mode } = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  const [pick, setPick] = useState(null); // clicked point + ranked stations
  const [query, setQuery] = useState('');
  const [dataset, setDataset] = useState('all'); // all | ISHRAE2014 | TMYx
  const [zoneFilter, setZoneFilter] = useState('all');
  const [vintage, setVintage] = useState('2019');
  const [constrType, setConstrType] = useState('SteelFramed');
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(null);
  const [preferred, setPreferred] = useState('newest');

  const all = stationData.stations;

  // Each TMYx station is published for several base periods. "TMYx" alone covers
  // the entire available record; the dated variants cover a rolling window, with
  // 2011-2025 the most recent. Pick the newest the station actually has, unless
  // the user has asked for a specific period.
  const periodFor = (s) => {
    if (preferred !== 'newest' && s.v.includes(preferred)) return preferred;
    return s.v[0];
  };
  const urlFor = (s) => `${stationData.baseUrl}${s.p}${periodFor(s)}.zip`;

  const stations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((s) => {
      if (dataset !== 'all' && s.src !== dataset) return false;
      if (zoneFilter !== 'all' && String(s.zn) !== zoneFilter) return false;
      if (q && !(s.n.toLowerCase().includes(q) || s.s.toLowerCase().includes(q) || s.w.includes(q)))
        return false;
      return true;
    });
  }, [all, query, dataset, zoneFilter]);

  const zoneCounts = useMemo(() => {
    const c = {};
    all.forEach((s) => { c[s.zn] = (c[s.zn] || 0) + 1; });
    return c;
  }, [all]);

  // Honeybee's HB Construction Set by Climate asserts 1 <= zone <= 8, so ASHRAE
  // zone 0 - which covers 193 of the 443 Indian stations - raises an error.
  // Zone 1 is the hottest set that exists in the standards library.
  const hbZone = (zn) => (zn === 0 ? 1 : zn);
  const constrSetString = (zn) =>
    `${vintage}::ClimateZone${hbZone(zn)}::${constrType}`;

  const copy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(key);
        setTimeout(() => setCopied(null), 1600);
      });
    }
  };

  const ClickProbe = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const ranked = stations
          .map((s) => ({ ...s, d: haversineKm(lat, lng, s.lat, s.lng) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 5);
        setPick({ lat, lng, ranked });
        setSelected(ranked[0] || null);
      },
    });
    return null;
  };

  const tileUrl = cartoTiles(mode === 'dark' ? 'dark_all' : 'light_all');

  const swatch = (colour, size = 13) => (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: colour,
        border: '1px solid rgba(0,0,0,0.35)',
        borderRadius: 2,
        flex: `0 0 ${size}px`,
      }}
    />
  );

  return (
    <div className="container">
      <div className="row gx-4 gb-4" data-bs-theme={mode}>
        <h1 className={`${textColorClass} d-flex mb-2`}>India Weather File Finder</h1>
        <p className={textColorClass}>
          Find the EPW weather file and ASHRAE climate zone for any location in India — the two
          inputs an EnergyPlus, Ladybug or Honeybee simulation needs. Click anywhere on the map to
          get the nearest weather stations ranked by distance, with direct downloads and a
          ready-made Honeybee construction set string. {stationData.count} stations covered.
        </p>

        {/* ---------------- zone 0 warning ---------------- */}
        <div className="alert alert-warning py-2" role="alert" style={{ fontSize: '0.9rem' }}>
          <strong>Honeybee does not accept ASHRAE zone 0.</strong> The{' '}
          <code>HB Construction Set by Climate</code> component asserts{' '}
          <code>1 &lt;= climate_zone &lt;= 8</code>, but zone 0 was added to ASHRAE&nbsp;169 in
          2020 and {zoneCounts[0] || 0} of these {stationData.count} Indian stations fall in it.
          Where a station reads 0A or 0B, this tool gives you <code>ClimateZone1</code> — the
          hottest construction set that exists in the standards library — and flags it.
        </div>

        {/* ---------------- controls ---------------- */}
        <div className={`card bg-${mode} ${textColorClass} border mb-3`}>
          <div className="card-body py-3">
            <div className="row g-3">
              <div className="col-sm-2">
                <label htmlFor="wff-search" className="form-label mb-1 small">Search station</label>
                <input
                  id="wff-search"
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="name, state or WMO no."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="col-sm-2">
                <label htmlFor="wff-dataset" className="form-label mb-1 small">Dataset</label>
                <select
                  id="wff-dataset"
                  className="form-select form-select-sm"
                  value={dataset}
                  onChange={(e) => setDataset(e.target.value)}
                >
                  <option value="all">All datasets</option>
                  <option value="ISHRAE2014">ISHRAE 2014 only</option>
                  <option value="TMYx">TMYx only</option>
                </select>
              </div>
              <div className="col-sm-2">
                <label htmlFor="wff-zone" className="form-label mb-1 small">ASHRAE zone</label>
                <select
                  id="wff-zone"
                  className="form-select form-select-sm"
                  value={zoneFilter}
                  onChange={(e) => setZoneFilter(e.target.value)}
                >
                  <option value="all">All zones</option>
                  {Object.keys(zoneCounts).sort().map((z) => (
                    <option key={z} value={z}>
                      Zone {z} ({zoneCounts[z]})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2">
                <label htmlFor="wff-period" className="form-label mb-1 small">Weather period</label>
                <select
                  id="wff-period"
                  className="form-select form-select-sm"
                  value={preferred}
                  onChange={(e) => setPreferred(e.target.value)}
                >
                  <option value="newest">Newest available</option>
                  {stationData.periodOrder.map((p) => (
                    <option key={p} value={p}>{p === 'TMYx' ? 'TMYx (full record)' : p.replace('TMYx.', '')}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2">
                <label htmlFor="wff-vintage" className="form-label mb-1 small">Vintage</label>
                <select
                  id="wff-vintage"
                  className="form-select form-select-sm"
                  value={vintage}
                  onChange={(e) => setVintage(e.target.value)}
                >
                  {VINTAGES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="col-sm-2">
                <label htmlFor="wff-constr" className="form-label mb-1 small">Construction</label>
                <select
                  id="wff-constr"
                  className="form-select form-select-sm"
                  value={constrType}
                  onChange={(e) => setConstrType(e.target.value)}
                >
                  {CONSTR_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="small mt-2" style={{ opacity: 0.75 }}>
              {stations.length} of {stationData.count} stations shown. Vintage and construction
              type only affect the Honeybee string, not which stations are listed.
            </div>
          </div>
        </div>

        {/* ---------------- map ---------------- */}
        <div
          className="border rounded overflow-hidden mb-3"
          style={{ height: '620px', position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, width: 200 }}>
            <div className={`card bg-${mode} ${textColorClass} border shadow-sm`}>
              <div className="px-2 py-2 border-bottom" style={{ fontWeight: 600, fontSize: '0.82rem' }}>
                ASHRAE 169 zones
              </div>
              <div className="px-2 py-1">
                {Object.keys(ZONE_COLOURS)
                  .filter((z) => zoneCounts[z])
                  .map((z) => (
                    <div key={z} className="d-flex align-items-center gap-2 py-1" style={{ fontSize: '0.72rem' }}>
                      {swatch(ZONE_COLOURS[z])}
                      <span style={{ fontWeight: 600, flex: '0 0 14px' }}>{z}</span>
                      <span className="text-truncate">{ZONE_LABELS[z]}</span>
                      <span style={{ opacity: 0.6 }}>{zoneCounts[z]}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <MapContainer
            center={INDIA_CENTER}
            zoom={5}
            minZoom={4}
            maxZoom={12}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> | Stations: climate.onebuilding.org'
              url={tileUrl}
              subdomains="abcd"
            />
            <ClickProbe />
            {stations.map((s) => (
              <CircleMarker
                key={s.w + s.src}
                center={[s.lat, s.lng]}
                radius={s.src === 'ISHRAE2014' ? 6 : 4}
                pathOptions={{
                  color: s.src === 'ISHRAE2014' ? '#000' : (mode === 'dark' ? '#bbb' : '#555'),
                  weight: s.src === 'ISHRAE2014' ? 2 : 1,
                  fillColor: ZONE_COLOURS[s.zn],
                  fillOpacity: 1,
                }}
                eventHandlers={{ click: () => setSelected(s) }}
              >
                <Popup>
                  <div style={{ minWidth: 210 }}>
                    <div style={{ fontWeight: 700 }}>{s.n}</div>
                    <div style={{ fontSize: '0.76rem', opacity: 0.8 }}>
                      {s.s} &middot; WMO {s.w} &middot; {s.e} m &middot; {s.src}
                    </div>
                    <hr style={{ margin: '6px 0' }} />
                    <div className="d-flex align-items-center gap-2">
                      {swatch(ZONE_COLOURS[s.zn], 15)}
                      <strong>ASHRAE {s.z}</strong>
                      <span style={{ fontSize: '0.75rem' }}>{ZONE_LABELS[s.zn]}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', marginTop: 4 }}>
                      Köppen <strong>{s.k || '—'}</strong> &middot; CDD10 {s.cdd} &middot; HDD18 {s.hdd}
                    </div>
                    <div style={{ fontSize: '0.75rem' }}>
                      Design: {s.htg}&deg;C heating / {s.clg}&deg;C cooling
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <a href={urlFor(s)} target="_blank" rel="noreferrer">Download EPW zip</a>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* ---------------- nearest stations to click ---------------- */}
        {pick && (
          <div className={`card bg-${mode} ${textColorClass} border mb-3`}>
            <div className="card-body">
              <h2 className="h5 mb-1">
                Nearest stations to {pick.lat.toFixed(4)}&deg;N, {pick.lng.toFixed(4)}&deg;E
              </h2>
              <p className="small mb-2" style={{ opacity: 0.75 }}>
                Closest is usually best, but check elevation too — a hill station 30 km away can
                represent your site far better than a plains station 10 km away.
              </p>
              <div className="table-responsive">
                <table className={`table table-sm table-${mode} table-bordered align-middle mb-0`}>
                  <thead>
                    <tr>
                      <th>Station</th><th>Dist.</th><th>Elev.</th><th>ASHRAE</th>
                      <th>Köppen</th><th>Dataset</th><th>EPW</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pick.ranked.map((s) => (
                      <tr
                        key={'near' + s.w + s.src}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(s)}
                      >
                        <td>{s.n} <span style={{ opacity: 0.6 }}>{s.s}</span></td>
                        <td>{s.d.toFixed(0)} km</td>
                        <td>{s.e} m</td>
                        <td>
                          {swatch(ZONE_COLOURS[s.zn], 11)} <strong>{s.z}</strong>
                          {s.zn === 0 && <span className="badge bg-warning text-dark ms-1">use 1</span>}
                        </td>
                        <td>{s.k || '—'}</td>
                        <td>{s.src}</td>
                        <td><a href={urlFor(s)} target="_blank" rel="noreferrer">zip</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- selected station detail ---------------- */}
        {selected && (
          <div className={`card bg-${mode} ${textColorClass} border mb-4`}>
            <div className="card-body">
              <h2 className="h5">
                {selected.n}, {selected.s}{' '}
                <span className="fs-6 fw-normal" style={{ opacity: 0.7 }}>
                  WMO {selected.w} &middot; {selected.e} m &middot; {selected.src}
                </span>
              </h2>

              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <table className={`table table-sm table-${mode} table-bordered align-middle mb-0`}>
                    <tbody>
                      <tr>
                        <th scope="row" style={{ width: '45%' }}>ASHRAE climate zone</th>
                        <td>
                          {swatch(ZONE_COLOURS[selected.zn], 12)} <strong>{selected.z}</strong>{' '}
                          — {ZONE_LABELS[selected.zn]}
                        </td>
                      </tr>
                      <tr><th scope="row">Köppen-Geiger</th><td>{selected.k || 'no land data'}</td></tr>
                      <tr><th scope="row">CDD10 / HDD18</th><td>{selected.cdd} / {selected.hdd}</td></tr>
                      <tr><th scope="row">99% heating design</th><td>{selected.htg} &deg;C</td></tr>
                      <tr><th scope="row">1% cooling design</th><td>{selected.clg} &deg;C</td></tr>
                      <tr><th scope="row">Coordinates</th><td>{selected.lat}&deg;N, {selected.lng}&deg;E</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <div className="mb-2">
                    <div className="small fw-semibold mb-1">1. Download the weather file</div>
                    <a className="btn btn-sm btn-primary" href={urlFor(selected)} target="_blank" rel="noreferrer">
                      Download EPW zip
                    </a>
                    <div className="small mt-1" style={{ opacity: 0.7 }}>
                      Unzip it — the <code>.epw</code> goes into your Ladybug <code>EPW file</code>{' '}
                      input. The <code>.stat</code> and <code>.ddy</code> alongside it hold the
                      design conditions.
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="small fw-semibold mb-1">
                      2. Honeybee construction set
                      {selected.zn === 0 && (
                        <span className="badge bg-warning text-dark ms-2">
                          zone 0 → mapped to 1
                        </span>
                      )}
                    </div>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control font-monospace"
                        readOnly
                        value={constrSetString(selected.zn)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => copy(constrSetString(selected.zn), 'cs')}
                      >
                        {copied === 'cs' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="small mt-1" style={{ opacity: 0.7 }}>
                      Or feed <code>_climate_zone</code> = <strong>{hbZone(selected.zn)}</strong>{' '}
                      into <code>HB Construction Set by Climate</code>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- notes ---------------- */}
        <div className={`card bg-${mode} ${textColorClass} border mb-4`}>
          <div className="card-body">
            <h3 className="h5">Notes</h3>
            <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
              <li>
                <strong>TMYx</strong> is a Typical Meteorological Year — a synthetic 12-month file
                built from the most representative months across many years of record. It is not a
                forecast and excludes extreme years, so size plant from the design conditions
                rather than from TMY peaks.
              </li>
              <li>
                <strong>Weather period.</strong> Most stations are published for several base
                periods; 2011–2025 is the most recent. This tool defaults to the newest each
                station has. Not every station has every period.
              </li>
              <li>
                <strong>ISHRAE 2014</strong> (59 stations, heavier outline) is the set Indian
                practice usually references. <strong>TMYx</strong> (384 stations) is denser and
                based on more recent data. Where both exist for one station, ISHRAE is shown.
              </li>
              <li>
                <strong>Zones are verified.</strong> Climate zones are the ASHRAE HOF 2025 values.
                For the 94 stations that also appear in ASHRAE Standard 169-2021, every zone here
                matches ASHRAE&apos;s published value exactly.
              </li>
              <li>
                Köppen codes come from the same raster as the{' '}
                <Link to="/tools/ClimateZoneMap">Climate Zone Map</Link> tool. Köppen is a
                climatological scheme — not interchangeable with ASHRAE zones or the NBC 2016
                building-design zones.
              </li>
            </ul>
          </div>
        </div>

        {/* ---------------- sources ---------------- */}
        <div className={`card bg-${mode} ${textColorClass} border mb-4`}>
          <div className="card-body">
            <h3 className="h5">Sources</h3>
            <ul className="mb-0" style={{ fontSize: '0.9rem' }}>
              <li>
                <a href={ONEBUILDING} target="_blank" rel="noreferrer">
                  climate.onebuilding.org
                </a>{' '}
                — station data, ASHRAE zones and weather files. Lawrie, L.K. &amp; Crawley, D.B.,
                <em> Development of Global Typical Meteorological Years (TMYx)</em>.
              </li>
              <li>
                <a href={ASHRAE_169} target="_blank" rel="noreferrer">
                  ANSI/ASHRAE Standard 169
                </a>{' '}
                — <em>Climatic Data for Building Design Standards</em>, which defines the climate
                zones. Used here to verify; nothing from it is reproduced.
              </li>
              <li>
                <a href={KOPPEN_PAPER} target="_blank" rel="noreferrer">
                  Beck et al. (2023)
                </a>{' '}
                — 1&nbsp;km Köppen-Geiger classification, <em>Scientific Data</em> 10, 724.
                CC&nbsp;BY&nbsp;4.0.
              </li>
              <li>
                <a href={HB_COMPONENT} target="_blank" rel="noreferrer">
                  HB Construction Set by Climate
                </a>{' '}
                — the Honeybee component these zone numbers feed, and{' '}
                <a href={LADYBUG_EPWMAP} target="_blank" rel="noreferrer">Ladybug Tools EPWmap</a>{' '}
                for browsing weather files.
              </li>
            </ul>
            <p className="small mb-0 mt-2" style={{ opacity: 0.7 }}>
              This page links to the original files and does not rehost them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherFileFinder;
