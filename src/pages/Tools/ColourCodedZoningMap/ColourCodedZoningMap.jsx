import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import { MapContainer, TileLayer, ImageOverlay, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// AAI Colour Coded Zoning Map (CCZM) height check for Bangalore aerodromes.
// Core rule (AAI NOCAS): a Local Body can approve a structure WITHOUT a separate
// AAI NOC when the Requested Top Elevation (RTE) is at or below the Permissible
// Top Elevation (PTE) read off the official CCZM. Otherwise a NOCAS application
// is required. The general CCZM ceiling is ~150 m AGL.
//   Max permissible height (AGL) = PTE (AMSL) - Site Elevation (AMSL)
//   RTE (AMSL) = Site Elevation (AMSL) + Proposed Height (AGL)
//
// Ground elevation is fetched from the free, keyless Open-Meteo elevation API
// using the latitude/longitude the user copies from Google Maps. PTE is still
// read by the user off the official map, because the CCZM grid has no clean
// georeferenced data to look it up from automatically.

const OFFICIAL_MAP_URL = 'https://nocas2.aai.aero/nocas/AAI_Links/CCZM_BANGALORE.pdf';
const NOCAS_URL = 'https://nocas2.aai.aero/nocas/';
const CCZM_CEILING_AGL = 150; // metres AGL, general CCZM ceiling
const ELEVATION_API = 'https://api.open-meteo.com/v1/elevation';

// Georeferenced CCZM overlay for the Leaflet map. The PNG (hosted at /pdfs/) is
// the official map cropped to its graticule; the bounds were computed from the
// same transform as latLngToCell, so overlay, marker and grid stay aligned.
const CCZM_OVERLAY_IMG = '/pdfs/CCZM_BANGALORE_overlay.png';
const CCZM_BOUNDS = [[12.75088, 77.50260], [13.39744, 77.91297]]; // [[S,W],[N,E]]
const MAP_CENTER = [13.074, 77.708]; // centre of the sheet

// Colour legend, sampled directly from the official CCZM PDF. Each colour is a
// permissible top elevation (AMSL) band; the salmon band means an AAI NOC is
// required regardless of height.
const CCZM_LEGEND = [
  { color: '#F57A7A', label: 'NOC required from AAI', noc: true },
  { color: '#F5CA7A', label: '≤ 928 m AMSL' },
  { color: '#00C5FF', label: '≤ 935 m AMSL' },
  { color: '#FFFF00', label: '≤ 955 m AMSL' },
  { color: '#6677CD', label: '≤ 965 m AMSL' },
  { color: '#FF7E29', label: '≤ 980 m AMSL' },
  { color: '#FF73DF', label: '≤ 1010 m AMSL' },
  { color: '#B2B2B2', label: '≤ 1025 m AMSL' },
  { color: '#AB9449', label: '≤ 1035 m AMSL' },
  { color: '#A3FF73', label: '≤ 1065 m AMSL' },
];

// Approximate reference points for the four Bangalore aerodromes (WGS-84).
const AIRPORTS = [
  { name: 'Kempegowda Intl (KIAL)', lat: 13.1979, lng: 77.7063 },
  { name: 'HAL Airport', lat: 12.9499, lng: 77.6681 },
  { name: 'Jakkur (GFTS)', lat: 13.0776, lng: 77.6068 },
  { name: 'Yelahanka AFB', lat: 13.1355, lng: 77.6058 },
];

// Great-circle distance between two lat/lng points, in kilometres.
const haversineKm = (lat1, lng1, lat2, lng2) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// CCZM master grid geometry, reverse-engineered from the reference PDF's
// coordinate graticule and per-cell labels. The map is centred on KIAL and
// laid out as 1-arc-minute cells: rows are lettered A (north) downward, columns
// are numbered 1 (west) eastward. These anchors are the north edge of row A and
// the west edge of column 1, in decimal degrees.
const GRID = {
  northLat: 13.3951, // latitude of the top edge of row A
  westLon: 77.4991,  // longitude of the left edge of column 1
  cell: 1 / 60,      // 1 arc-minute per cell, in degrees
  rows: 26,          // A..Z
  cols: 25,          // 1..25
};

// Convert a lat/lng to its CCZM grid cell (e.g. "L13"), or flag it as outside
// the mapped area. Pure arithmetic — no PDF parsing at runtime.
const latLngToCell = (lat, lng) => {
  const rowIdx = Math.floor((GRID.northLat - lat) / GRID.cell);
  const colIdx = Math.floor((lng - GRID.westLon) / GRID.cell) + 1;
  const inGrid = rowIdx >= 0 && rowIdx < GRID.rows && colIdx >= 1 && colIdx <= GRID.cols;
  return {
    inGrid,
    cell: inGrid ? `${String.fromCharCode(65 + rowIdx)}${colIdx}` : null,
    rowLetter: inGrid ? String.fromCharCode(65 + rowIdx) : null,
    colNumber: inGrid ? colIdx : null,
  };
};

// Small helper: pan/zoom the Leaflet map to the marker when coordinates change.
const RecenterMap = ({ marker }) => {
  const map = useMap();
  useEffect(() => {
    if (marker) map.setView([marker.lat, marker.lng], 14, { animate: true });
  }, [marker, map]);
  return null;
};

const ColourCodedZoningMap = () => {
  const { mode } = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  const [coords, setCoords] = useState('');
  const [siteElevation, setSiteElevation] = useState('');
  const [pte, setPte] = useState('');
  const [proposedHeight, setProposedHeight] = useState('');

  const [distances, setDistances] = useState(null);
  const [cellInfo, setCellInfo] = useState(null);
  const [marker, setMarker] = useState(null);          // {lat,lng} for the map pin
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [legendOpen, setLegendOpen] = useState(true);
  const [elevLoading, setElevLoading] = useState(false);
  const [elevError, setElevError] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Fetch ground elevation for the pasted coordinates and compute airport distances.
  const fetchElevation = async () => {
    // Accept the Google Maps clipboard format "lat, lng"; also tolerate spaces.
    const parts = coords.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
    const latNum = parseFloat(parts[0]);
    const lngNum = parseFloat(parts[1]);
    if (parts.length !== 2 || isNaN(latNum) || isNaN(lngNum)) {
      setElevError('Paste coordinates as "latitude, longitude" — e.g. 12.981572, 77.596195.');
      return;
    }
    if (latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
      setElevError('Latitude must be between -90 and 90, longitude between -180 and 180.');
      return;
    }
    setElevError('');
    setElevLoading(true);
    try {
      const res = await fetch(`${ELEVATION_API}?latitude=${latNum}&longitude=${lngNum}`);
      if (!res.ok) throw new Error(`Service responded ${res.status}`);
      const data = await res.json();
      const elev = Array.isArray(data.elevation) ? data.elevation[0] : data.elevation;
      if (elev === undefined || elev === null || isNaN(elev)) {
        throw new Error('No elevation returned for that location.');
      }
      setSiteElevation(String(Math.round(elev * 100) / 100));
      setDistances(
        AIRPORTS.map((a) => ({
          name: a.name,
          km: haversineKm(latNum, lngNum, a.lat, a.lng),
        })).sort((x, y) => x.km - y.km)
      );
      setCellInfo(latLngToCell(latNum, lngNum));
      setMarker({ lat: latNum, lng: lngNum });
    } catch (err) {
      setElevError(
        `Could not fetch elevation automatically (${err.message}). You can type your site elevation in manually below.`
      );
    } finally {
      setElevLoading(false);
    }
  };

  const calculate = (e) => {
    e.preventDefault();

    const pteNum = parseFloat(pte);
    const siteNum = parseFloat(siteElevation);
    const proposedNum = proposedHeight === '' ? null : parseFloat(proposedHeight);

    if (isNaN(siteNum)) {
      setError('Please fetch or enter your Site Elevation (m AMSL) first.');
      setResult(null);
      return;
    }
    if (isNaN(pteNum)) {
      setError('Please enter the Permissible Top Elevation (PTE) you read off the CCZM map below.');
      setResult(null);
      return;
    }
    if (pteNum <= 0 || siteNum <= 0) {
      setError('Elevation values should be positive numbers in metres.');
      setResult(null);
      return;
    }
    if (siteNum > pteNum) {
      setError('Your Site Elevation is higher than the Permissible Top Elevation. Please re-check the values.');
      setResult(null);
      return;
    }
    setError('');

    const maxHeightAgl = pteNum - siteNum;
    const cappedByCeiling = maxHeightAgl > CCZM_CEILING_AGL;

    let verdict = null;
    if (proposedNum !== null && !isNaN(proposedNum)) {
      const rte = siteNum + proposedNum;
      const withinPte = rte <= pteNum;
      const withinCeiling = proposedNum <= CCZM_CEILING_AGL;
      verdict = { proposedNum, rte, withinPte, withinCeiling, ok: withinPte && withinCeiling };
    }

    setResult({ pteNum, siteNum, maxHeightAgl, cappedByCeiling, verdict });
  };

  const reset = () => {
    setCoords('');
    setSiteElevation('');
    setPte('');
    setProposedHeight('');
    setDistances(null);
    setCellInfo(null);
    setMarker(null);
    setElevError('');
    setResult(null);
    setError('');
  };

  return (
    <div className='container'>
      <div className='row gx-4 gb-4' data-bs-theme={mode}>
        <h1 className={`${textColorClass} d-flex mb-2`}>Airport Height Restriction (CCZM) Check</h1>
        <p className={`${textColorClass} mb-2`}>
          Bangalore aerodromes &mdash; Kempegowda International (KIAL), HAL, Jakkur (GFTS) &amp; Yelahanka.
          Paste your plot's latitude &amp; longitude from Google Maps to auto-fetch its ground elevation,
          then read the Permissible Top Elevation off the official map to get your maximum permissible height.
        </p>
        <div className='col-12 mt-4 mb-4'>
          <h3 className={`${textColorClass} mb-3`}>Interactive CCZM Map</h3>
          <p className={`${textColorClass} mb-3`}>
            The official Colour Coded Zoning Map is laid over the street map. Drag the slider to fade it,
            zoom in to read a cell's Permissible Top Elevation, and enter that value in the calculator
            above. Your pasted location shows as a blue dot.
          </p>

          <div className='d-flex align-items-center gap-2 mb-2' style={{ maxWidth: 420 }}>
            <label htmlFor='opacityRange' className={`${textColorClass} small text-nowrap mb-0`}>
              CCZM overlay: {Math.round(overlayOpacity * 100)}%
            </label>
            <input
              type='range'
              className='form-range'
              id='opacityRange'
              min='0'
              max='100'
              value={overlayOpacity * 100}
              onChange={(e) => setOverlayOpacity(Number(e.target.value) / 100)}
            />
          </div>
          <div className='border rounded overflow-hidden' style={{ height: '600px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, width: 210 }}>
              <div className={`card bg-${mode} ${textColorClass} border shadow-sm`}>
                <button
                  type='button'
                  onClick={() => setLegendOpen((o) => !o)}
                  className={`btn btn-sm d-flex justify-content-between align-items-center ${textColorClass}`}
                  style={{ fontWeight: 600 }}
                >
                  <span>Colour legend</span>
                  <span>{legendOpen ? '▾' : '▸'}</span>
                </button>
                {legendOpen && (
                  <div className='px-2 pb-2' style={{ maxHeight: 240, overflowY: 'auto' }}>
                    <div className='small text-muted mb-1'>Permissible top elevation</div>
                    {CCZM_LEGEND.map((it) => (
                      <div key={it.label} className='d-flex align-items-center mb-1'>
                        <span
                          style={{
                            display: 'inline-block', width: 16, height: 16, background: it.color,
                            border: '1px solid rgba(0,0,0,0.25)', borderRadius: 3, marginRight: 6, flex: '0 0 auto',
                          }}
                        />
                        <span className='small'>{it.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <MapContainer center={MAP_CENTER} zoom={11} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <ImageOverlay url={CCZM_OVERLAY_IMG} bounds={CCZM_BOUNDS} opacity={overlayOpacity} />
              {marker && (
                <CircleMarker
                  center={[marker.lat, marker.lng]}
                  radius={8}
                  pathOptions={{ color: '#0d6efd', weight: 2, fillColor: '#0d6efd', fillOpacity: 0.7 }}
                >
                  <Popup>
                    {cellInfo && cellInfo.inGrid ? `Grid cell ${cellInfo.cell}` : 'Your location'}
                  </Popup>
                </CircleMarker>
              )}
              <RecenterMap marker={marker} />
            </MapContainer>
          </div>

          <div className='form-text mt-1'>
            Overlay is a visual aid aligned to ~100 m; the{' '}
            <a href={OFFICIAL_MAP_URL} target='_blank' rel='noopener noreferrer'>official CCZM PDF</a>{' '}
            remains the authority.
          </div>
        </div>
        <div className='col-lg-6 col-sm-auto'>
          <form onSubmit={calculate} className={`bg-${mode} p-4 mb-4 border rounded`}>

            <h6 className={textColorClass}>1. Location (from Google Maps)</h6>
            <div className='mb-2'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  id='coordsInput'
                  placeholder='12.981572, 77.596195'
                  value={coords}
                  onChange={(e) => { setCoords(e.target.value); setElevError(''); }}
                />
                <label htmlFor='coordsInput'>Coordinates &mdash; latitude, longitude</label>
              </div>
            </div>
            <div className='form-text mb-2'>
              In Google Maps, right-click your plot and click the coordinates at the top of the menu to
              copy them, then paste the whole string here (e.g. 12.981572, 77.596195).
            </div>
            <button
              type='button'
              className='btn btn-outline-primary btn-sm mb-3'
              onClick={fetchElevation}
              disabled={elevLoading}
            >
              {elevLoading ? 'Fetching…' : 'Get site elevation & airport distances'}
            </button>

            {elevError && <div className='alert alert-warning py-2'>{elevError}</div>}

            {cellInfo && (
              cellInfo.inGrid ? (
                <div className='alert alert-primary py-2'>
                  Your plot is in CCZM grid cell <strong>{cellInfo.cell}</strong>. On the map below,
                  find row <strong>{cellInfo.rowLetter}</strong> (letters run down the side) and
                  column <strong>{cellInfo.colNumber}</strong> (numbers run across), and read that
                  cell's Permissible Top Elevation into the PTE box.
                </div>
              ) : (
                <div className='alert alert-secondary py-2'>
                  This location falls outside the KIAL-centred grid on this map (it covers roughly
                  77&deg;30&prime;&ndash;77&deg;55&prime;E, 12&deg;58&prime;&ndash;13&deg;24&prime;N).
                  Use the map to locate it and read the nearest permissible elevation, or check the
                  relevant airport's own CCZM.
                </div>
              )
            )}

            {distances && (
              <div className={`card bg-${mode} ${textColorClass} border mb-3`}>
                <div className='card-body py-2'>
                  <div className='small mb-1'>Distance to Bangalore aerodromes:</div>
                  {distances.map((d) => (
                    <div key={d.name} className='d-flex justify-content-between small'>
                      <span>{d.name}</span>
                      <span>{d.km.toFixed(1)} km</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h6 className={textColorClass}>2. Elevations (metres AMSL)</h6>
            <div className='mb-3'>
              <div className='form-floating'>
                <input
                  type='number'
                  step='any'
                  className='form-control'
                  id='siteInput'
                  placeholder='e.g. 910'
                  value={siteElevation}
                  onChange={(e) => { setSiteElevation(e.target.value); setError(''); }}
                />
                <label htmlFor='siteInput'>Site Elevation &mdash; auto-filled, editable (m AMSL)</label>
              </div>
              <div className='form-text'>Fetched from your coordinates. Override it if you have a survey value.</div>
            </div>

            <div className='mb-3'>
              <div className='form-floating'>
                <input
                  type='number'
                  step='any'
                  className='form-control'
                  id='pteInput'
                  placeholder='e.g. 960'
                  value={pte}
                  onChange={(e) => { setPte(e.target.value); setError(''); }}
                />
                <label htmlFor='pteInput'>Permissible Top Elevation &mdash; PTE (m AMSL)</label>
              </div>
              <div className='form-text'>Read this off the official CCZM map below for your plot's grid cell.</div>
            </div>

            <h6 className={textColorClass}>3. Your building (optional)</h6>
            <div className='mb-3'>
              <div className='form-floating'>
                <input
                  type='number'
                  step='any'
                  className='form-control'
                  id='proposedInput'
                  placeholder='e.g. 45'
                  value={proposedHeight}
                  onChange={(e) => { setProposedHeight(e.target.value); setError(''); }}
                />
                <label htmlFor='proposedInput'>Proposed Building Height (m AGL)</label>
              </div>
              <div className='form-text'>Leave blank to just see your maximum permissible height.</div>
            </div>

            {error && <div className='alert alert-danger py-2'>{error}</div>}

            <div className='d-flex gap-2'>
              <button type='submit' className='btn btn-primary'>Calculate</button>
              <button type='button' className='btn btn-outline-secondary' onClick={reset}>Reset</button>
            </div>
          </form>

          {result && (
            <div className={`card bg-${mode} ${textColorClass} border mb-4`}>
              <div className='card-body'>
                <h5 className='card-title'>Result</h5>
                <p className='mb-2'>
                  Maximum permissible building height:{' '}
                  <strong>{result.maxHeightAgl.toFixed(2)} m AGL</strong>
                  {result.cappedByCeiling && (
                    <span className='d-block text-warning small mt-1'>
                      Note: the CCZM general ceiling is {CCZM_CEILING_AGL} m AGL, so anything above that
                      needs a NOCAS application even though the elevation maths allows more.
                    </span>
                  )}
                </p>
                <p className='mb-0 small text-muted'>
                  Calculated as PTE ({result.pteNum} m) &minus; Site Elevation ({result.siteNum} m).
                </p>

                {result.verdict && (
                  <div className={`alert mt-3 mb-0 ${result.verdict.ok ? 'alert-success' : 'alert-warning'}`}>
                    {result.verdict.ok ? (
                      <>
                        <strong>&#10003; Within limits.</strong> Your Requested Top Elevation
                        ({result.verdict.rte.toFixed(2)} m AMSL) is at or below the PTE
                        ({result.pteNum} m AMSL). The local body can generally approve this without a
                        separate AAI NOC.
                      </>
                    ) : (
                      <>
                        <strong>&#9888; NOCAS application likely required.</strong>{' '}
                        {!result.verdict.withinPte && (
                          <>Your Requested Top Elevation ({result.verdict.rte.toFixed(2)} m AMSL)
                          exceeds the PTE ({result.pteNum} m AMSL). </>
                        )}
                        {!result.verdict.withinCeiling && (
                          <>The proposed height ({result.verdict.proposedNum} m AGL) is above the{' '}
                          {CCZM_CEILING_AGL} m AGL CCZM ceiling. </>
                        )}
                        File a NOCAS application with AAI before proceeding.
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className='col-lg-6 col-sm-auto p-3'>
          <div className='alert alert-info'>
            <strong>Important:</strong> This tool is an aid only. The official AAI Colour Coded Zoning
            Map and the NOCAS portal are the final authority. The ground elevation is an estimate from a
            public terrain dataset &mdash; verify with a survey, and always confirm your grid cell's
            permissible elevation on the official map before making design decisions.
          </div>

          <h4 className={`${textColorClass} my-3`}>How to use this</h4>
          <ol className={textColorClass}>
            <li className='mb-2'>
              In Google Maps, right-click your plot &rarr; click the latitude/longitude to copy, then
              paste both into the boxes and press <strong>Get site elevation</strong>.
            </li>
            <li className='mb-2'>
              Find the same plot in the embedded{' '}
              <a href={OFFICIAL_MAP_URL} target='_blank' rel='noopener noreferrer'>official CCZM map</a>{' '}
              below and read its <strong>Permissible Top Elevation (PTE)</strong> in metres AMSL.
            </li>
            <li className='mb-2'>
              Optionally enter your <strong>proposed building height</strong>, then press
              <strong> Calculate</strong>.
            </li>
          </ol>

          <h4 className={`${textColorClass} my-3`}>Key terms</h4>
          <div className='table-responsive'>
            <table className={`table table-sm table-${mode} table-bordered align-middle`}>
              <tbody>
                <tr>
                  <th scope='row'>AMSL</th>
                  <td>Above Mean Sea Level &mdash; an altitude, like on a map.</td>
                </tr>
                <tr>
                  <th scope='row'>AGL</th>
                  <td>Above Ground Level &mdash; a building's height from its own plot.</td>
                </tr>
                <tr>
                  <th scope='row'>PTE</th>
                  <td>Permissible Top Elevation &mdash; the max top-of-structure altitude AAI allows, from the CCZM.</td>
                </tr>
                <tr>
                  <th scope='row'>RTE</th>
                  <td>Requested Top Elevation &mdash; your site elevation plus your building height.</td>
                </tr>
                <tr>
                  <th scope='row'>NOCAS</th>
                  <td>AAI's online No-Objection-Certificate system for heights beyond the permissible limit.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className={`${textColorClass} my-3`}>The rule in short</h4>
          <p className={textColorClass}>
            If your Requested Top Elevation is at or below the Permissible Top Elevation
            (and within the {CCZM_CEILING_AGL} m AGL ceiling), the local body can approve without a
            separate AAI NOC. Above that, you must apply through{' '}
            <a href={NOCAS_URL} target='_blank' rel='noopener noreferrer'>NOCAS</a>.
          </p>
          <p className={textColorClass}>
            For the full local &amp; aerodrome height rules (BBMP, BIAAPA, AAI), see the{' '}
            <Link to='/resources/HeightByelaws'>Building Height Byelaws</Link> reference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColourCodedZoningMap;
