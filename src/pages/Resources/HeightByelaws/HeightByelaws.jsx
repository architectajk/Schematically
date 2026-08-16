import React, { useContext } from 'react';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import { Link } from 'react-router-dom';

// Building-height byelaws for Bengaluru: the local (Karnataka/BBMP) controls and
// the central aerodrome (AAI) controls, plus how they combine. Content is a
// plain-English reference for architects/students; official documents linked at
// the end remain the authority. Figures reflect sources reviewed Aug 2026.

const HeightByelaws = () => {
  const { mode } = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
  const tableClass = `table table-sm table-${mode} table-bordered align-middle`;

  return (
    <div className='container' data-bs-theme={mode}>
      <h1 className={`${textColorClass} mb-3`}>Building Height Byelaws &mdash; Bengaluru</h1>

      <div className='alert alert-info'>
        In Bengaluru a building&rsquo;s permissible height is set by <strong>two independent controls</strong>,
        and you must satisfy <strong>both</strong> &mdash; whichever is lower wins:
        the <strong>local</strong> town-planning byelaws (road width, FAR, zone) and the
        central <strong>aerodrome</strong> height limits near airports (AAI). Near KIAL or HAL, the
        aerodrome cap often governs.
      </div>

      <div className='text-center my-4'>
        <pre className={`${textColorClass} d-inline-block text-start mb-0`} style={{ fontSize: '0.85rem' }}>
{`   Permissible height =  MIN (
        Local byelaw height  (road width / FAR / zone),
        AAI-cleared height   (CCZM PTE  -  site elevation)
   )`}
        </pre>
      </div>

      {/* ================= LOCAL ================= */}
      <h2 className={`${textColorClass} mt-4`}>1. Local byelaws (Karnataka / BBMP)</h2>

      <h5 className={`${textColorClass} mt-3`}>Governing framework</h5>
      <p className={textColorClass}>
        Height in Bengaluru is regulated under the <strong>Karnataka Town and Country Planning Act, 1961</strong>,
        the <strong>Revised Master Plan 2015 (RMP-2015) Zoning Regulations</strong> issued by the Bangalore
        Development Authority (BDA), and the <strong>BBMP Building Bye-laws, 2003</strong> (with later
        amendments). The <strong>National Building Code (NBC) 2016</strong> is referenced for definitions and
        fire/life-safety provisions.
      </p>

      <h5 className={`${textColorClass} mt-3`}>What actually sets the height</h5>
      <p className={textColorClass}>
        There is no single fixed height limit &mdash; it is derived from the combination of your abutting
        <strong> road width</strong>, <strong>plot area</strong>, permissible <strong>Floor Area Ratio (FAR)</strong>,
        and <strong>land-use zone</strong>. The key thresholds:
      </p>

      <div className='table-responsive'>
        <table className={tableClass}>
          <thead className='table-primary'>
            <tr><th>Control</th><th>Rule of thumb</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Road width vs height</td>
              <td>Where the abutting road is <strong>below 9 m</strong>, building height is capped at
              <strong> 15 m</strong> (including stilt), regardless of the FAR otherwise available.</td>
            </tr>
            <tr>
              <td>High-rise trigger</td>
              <td>A building of <strong>G+4 floors or ≥ 15 m</strong> is a &ldquo;high-rise&rdquo; (BBMP
              Bye-laws 2003 / NBC). High-rises attract additional structural, fire and setback rules.</td>
            </tr>
            <tr>
              <td>Road width for high-rise</td>
              <td>The minimum road width facing a high-rise building is <strong>12 m</strong>.</td>
            </tr>
            <tr>
              <td>FAR (Floor Area Ratio)</td>
              <td>Varies with plot size, road width and zone. For group housing, FAR ranges roughly
              <strong> 1.75&ndash;3.25</strong> (RMP-2015). Higher FAR generally needs wider abutting roads.</td>
            </tr>
            <tr>
              <td>Setbacks</td>
              <td>All-round open space that <strong>increases with height</strong> &mdash; taller buildings
              need deeper setbacks for light, ventilation, drainage and fire-tender access.</td>
            </tr>
            <tr>
              <td>Fire NOC</td>
              <td>Mandatory from Karnataka State Fire &amp; Emergency Services for any building
              <strong> over 15 m</strong> (G.O. HD&nbsp;33&nbsp;SFB&nbsp;2011, 07.07.2011).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='alert alert-warning'>
        <strong>Definitions are shifting.</strong> The Karnataka Fire Force (Amendment) proposals (2025)
        move the &ldquo;high-rise&rdquo; threshold toward <strong>&gt; 21 m</strong>, and recent RMP
        amendments eased norms for small plots (≤ 150 sq m) and raised permissible stilt height. Always
        confirm the current figure with BBMP/BDA before designing.
      </div>

      <h5 className={`${textColorClass} mt-4`}>Around KIAL: the BIAAPA area</h5>
      <p className={textColorClass}>
        For plots in the ring of country around Kempegowda International Airport, the local planning
        authority is usually <strong>not BBMP</strong> but the <strong>Bengaluru International Airport Area
        Planning Authority (BIAAPA)</strong>, constituted under the Karnataka Town and Country Planning Act,
        1961. Its <strong>Master Plan (2021)</strong> governs land use across roughly <strong>228 villages
        (~1,800 km²)</strong> spanning Devanahalli, Doddaballapur, Chikkajala, parts of Yelahanka and the
        Nandi Hills area &mdash; essentially the zone your CCZM tool sheet covers.
      </p>

      <div className='table-responsive'>
        <table className={tableClass}>
          <thead className='table-primary'>
            <tr><th>BIAAPA aspect</th><th>What it means for height / approval</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Zoning</td>
              <td>Residential, commercial, industrial, public-utility and green zones, each with its own FAR,
              setbacks and permitted uses &mdash; height is still driven by road width, FAR and zone, on the
              Karnataka model-byelaw framework.</td>
            </tr>
            <tr>
              <td>Land-use conversion (CLU)</td>
              <td>Agricultural land needs a <strong>Change of Land Use / DC conversion</strong> order first.
              Without a valid CLU, BIAAPA will not issue a building-plan sanction, and construction is liable
              for demolition.</td>
            </tr>
            <tr>
              <td>Plan sanction</td>
              <td>Application &rarr; fee &rarr; scrutiny &rarr; sanction. &ldquo;BIAAPA-approved&rdquo; layouts
              carry <strong>A-khata</strong>; verify it before buying or building.</td>
            </tr>
            <tr>
              <td>Airport overlay (dominant here)</td>
              <td>Because this <em>is</em> the airport&rsquo;s planning area, the AAI colour-coded height
              restriction and NOC (Section 2) are typically the <strong>binding</strong> height control &mdash;
              the very CCZM the tool reads.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= AERODROME ================= */}
      <h2 className={`${textColorClass} mt-4`}>2. Aerodrome byelaws (AAI &mdash; central)</h2>

      <h5 className={`${textColorClass} mt-3`}>Governing framework</h5>
      <p className={textColorClass}>
        Height near airports is controlled centrally under the <strong>Aircraft Act, 1934</strong> and the
        <strong> Ministry of Civil Aviation (Height Restrictions for Safeguarding of Aircraft Operations)
        Rules, 2015</strong> [notified as <strong>GSR&nbsp;751(E)</strong>, 30 September 2015]. A
        <strong> No-Objection Certificate (NOC) is mandatory before construction</strong> for structures near
        an aerodrome, obtained through the Airports Authority of India&rsquo;s online <strong>NOCAS</strong> portal.
      </p>

      <h5 className={`${textColorClass} mt-3`}>Obstacle Limitation Surfaces (OLS)</h5>
      <p className={textColorClass}>
        The rules protect a set of imaginary &ldquo;obstacle limitation surfaces&rdquo; around each runway
        that a structure must not pierce:
      </p>
      <div className='table-responsive'>
        <table className={tableClass}>
          <thead className='table-primary'>
            <tr><th>Surface</th><th>What it does</th></tr>
          </thead>
          <tbody>
            <tr><td>Approach &amp; take-off climb</td><td>Most restrictive; protects the sloping airspace off each runway end.</td></tr>
            <tr><td>Transitional</td><td>Sloping surfaces along the sides of the runway strip.</td></tr>
            <tr><td>Inner horizontal</td><td>A flat cap (commonly <strong>45 m</strong> above aerodrome elevation) over roughly a 4 km radius.</td></tr>
            <tr><td>Conical</td><td>Rises outward and upward beyond the inner horizontal surface.</td></tr>
            <tr><td>Outer horizontal</td><td>Permissible height rises about <strong>1 m per 20 m</strong> of extra distance, up to ~300 m, out to ~15 km.</td></tr>
            <tr><td>PANS-OPS</td><td>Instrument-procedure surfaces, protected out to ~30 nautical miles from nav aids (VOR/NDB).</td></tr>
          </tbody>
        </table>
      </div>

      <h5 className={`${textColorClass} mt-3`}>When is an AAI NOC needed?</h5>
      <ul className={textColorClass}>
        <li className='mb-1'>Generally required for structures within <strong>20 km</strong> of the aerodrome reference point.</li>
        <li className='mb-1'>Beyond <strong>20 km (visual airports)</strong> / <strong>56 km (instrument airports)</strong> with a height <strong>≤ 150 m above ground level</strong>, no AAI NOC is required (auto-settled).</li>
        <li className='mb-1'>The general ceiling a Colour Coded Zoning Map ever permits is about <strong>150 m AGL</strong>.</li>
      </ul>

      <h5 className={`${textColorClass} mt-3`}>Colour Coded Zoning Maps (CCZM)</h5>
      <p className={textColorClass}>
        For cities with a published CCZM, the map gives a <strong>Permissible Top Elevation (PTE)</strong> in
        metres AMSL for each grid cell. If your <strong>Requested Top Elevation</strong> (site ground level +
        structure height, in AMSL) is <strong>at or below the PTE</strong>, the local body can approve the
        building <strong>without a separate AAI NOC</strong>; if it exceeds the PTE, you must file a NOCAS
        application. Bengaluru&rsquo;s CCZM bands run from <strong>928 m up to 1065 m AMSL</strong>, with salmon
        zones requiring an AAI NOC regardless of height.
      </p>

      <div className='table-responsive'>
        <table className={tableClass}>
          <thead className='table-primary'>
            <tr><th>Bengaluru aerodrome</th><th>Type / ambit</th></tr>
          </thead>
          <tbody>
            <tr><td>Kempegowda International (KIAL), Devanahalli</td><td>Instrument airport &mdash; 56 km ambit; this is the sheet the CCZM tool covers.</td></tr>
            <tr><td>HAL Airport</td><td>Operational airfield in the city&rsquo;s east.</td></tr>
            <tr><td>Jakkur (Govt. Flying Training School)</td><td>Flying-training aerodrome.</td></tr>
            <tr><td>Yelahanka Air Force Station</td><td>Defence aerodrome.</td></tr>
          </tbody>
        </table>
      </div>

      {/* ================= INTERACTION ================= */}
      <h2 className={`${textColorClass} mt-4`}>3. How the two combine</h2>
      <p className={textColorClass}>
        Clear the local byelaws <em>and</em> the aerodrome limits. Work out your maximum height under the
        BBMP/RMP rules (road width, FAR, zone), then check it against the AAI Permissible Top Elevation for
        your plot. Your buildable height is the <strong>lower</strong> of the two. Close to KIAL and HAL, the
        aerodrome cap is frequently the binding constraint.
      </p>

      <div className='alert alert-success'>
        Use the{' '}
        <Link to='/tools/ColourCodedZoningMap'>Airport Height Restriction (CCZM) Check</Link>{' '}
        tool to look up your plot&rsquo;s grid cell and compute the AAI-cleared height from your coordinates.
      </div>

      {/* ================= SOURCES ================= */}
      <h2 className={`${textColorClass} mt-4`}>Official sources</h2>
      <ul className={textColorClass}>
        <li><a href='https://www.indiacode.nic.in/ViewFileUploaded?path=AC_KA_71_402_00001_11_1552283484255%2Frulesindividualfile%2F&file=zoning_regulations_rmp2015f.pdf' target='_blank' rel='noopener noreferrer'>RMP-2015 Zoning Regulations, BDA (official PDF)</a></li>
        <li><a href='https://www.naredco.in/notification/pdfs/Bangalore-Building-Byelaws.pdf' target='_blank' rel='noopener noreferrer'>BBMP Building Bye-laws, 2003</a></li>
        <li><a href='http://biaapa.tpa.gov.in/en/planning' target='_blank' rel='noopener noreferrer'>BIAAPA &mdash; Master Plan &amp; planning (official)</a></li>
        <li><a href='https://indiankanoon.org/doc/91030059/' target='_blank' rel='noopener noreferrer'>MoCA (Height Restrictions for Safeguarding of Aircraft Operations) Rules, 2015 &mdash; GSR 751(E)</a></li>
        <li><a href='https://nocas2.aai.aero/nocas/' target='_blank' rel='noopener noreferrer'>AAI NOCAS portal &amp; Colour Coded Zoning Maps</a></li>
        <li><a href='https://nocas2.aai.aero/nocas/FAQ.html' target='_blank' rel='noopener noreferrer'>AAI NOCAS FAQ (NOC applicability, CCZM)</a></li>
      </ul>

      <p className={`${textColorClass} small text-muted mt-3`}>
        Reference only, reviewed August 2026. Byelaws and aerodrome maps are amended periodically &mdash;
        confirm current figures with BBMP/BDA and the AAI NOCAS portal before relying on them.
      </p>
    </div>
  );
};

export default HeightByelaws;
