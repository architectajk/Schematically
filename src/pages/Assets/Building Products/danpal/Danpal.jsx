import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaFacebook, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Text-forward version of the Nuvocotto detail-page pattern. Danpal has only
// one image in the repo (the portrait catalog tile used on /assets), so there
// is no hero strip and no product galleries - a portrait image stretched into
// a full-width banner would crop to a useless sliver. Drop gallery rows in
// below "Systems" once real product photos exist.
//
// Danpal publishes no postal address or phone number anywhere on danpal.com -
// their contact page is a form only - so there is deliberately no Contact
// block here. Do not fill one in from a directory or aggregator site.
const Danpal = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Danpal/DanpalImages/Danpal_productcatalogimage.png" alt="Danpal translucent daylighting systems" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>Danpal</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>Danpal</p>
          <p className={textColorClass}>
            Light-transmitting architectural systems for building envelopes -
            translucent polycarbonate panels with concealed standing-seam framing
            for facades, cladding, roofs, skylights and shading.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Translucent Daylighting Systems (Facades, Roofing, Skylights)</li>
            <li className='my-1'><strong>Material:</strong> Polycarbonate, Aluminium</li>
            <li className='my-1'><strong>Use:</strong> Translucent facades, roof glazing, skylights, canopies and light-diffusing wall cladding</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* Single dark mark on a transparent background, so dark mode
              recolours it to white automatically. Add a dedicated white file
              as `dark` if the flat silhouette loses any detail. */}
          <BrandLogo
            href="https://danpal.com/"
            light="/Products/Danpal/DanpalImages/danpal_logo.png"
            alt="Danpal logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://danpal.com/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="danpal-anchor-01">
                  <Link to="https://www.instagram.com/danpal_global/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#danpal-anchor-01" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="danpal-anchor-02">
                  <Link to="https://www.facebook.com/danpalLightarchitecture/" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#danpal-anchor-02" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="danpal-anchor-03">
                  <Link to="https://twitter.com/Danpal_LA" target="_blank" rel="noopener noreferrer"><FaXTwitter size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#danpal-anchor-03" content="X (Twitter)" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="danpal-anchor-04">
                  <Link to="https://www.youtube.com/channel/UCIsY97j1GWuu6SHo5Y2Qy8g" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#danpal-anchor-04" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>APPLICATIONS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Facade</li>
              <li className='my-1'>Cladding</li>
              <li className='my-1'>Skylight</li>
              <li className='my-1'>Outdoor</li>
              <li className='my-1'>Shading</li>
              <li className='my-1'>Interior</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            Danpal designs, manufactures and distributes daylighting systems for
            building envelopes. The company was the first to develop the translucent
            panel standing-seam system - a dry-glazed, mechanically fixed assembly
            where the panel joint is concealed within the connector rather than
            sealed with exposed gaskets, which is what allows large uninterrupted
            translucent surfaces without a visible grid of framing.
          </p>
          <p className={textColorClass}>
            The panels are marketed under the Danpalon name and are specified for
            diffused natural light, thermal insulation and impact resistance at a
            fraction of the weight of glass. Danpal reports over 50 years in the
            market, operating across five continents through eight regional
            subsidiaries.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Systems</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Facade and Cladding</h5>
              <ul className={`${textColorClass} small`}>
                <li>Danpatherm K12 / K7 - double high-insulation facade</li>
                <li>Danpal Facade System - single glazed translucent</li>
                <li>Controlite - intelligent daylighting system</li>
                <li>Danpal Everbright - self-supporting facade</li>
                <li>Compact 4mm translucent facade</li>
                <li>Danpal VRS - ventilated rainscreen</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Roofing, Shading and Interior</h5>
              <ul className={`${textColorClass} small`}>
                <li>Danpatherm RK7 - double high-insulation roof</li>
                <li>Danpal Roofing System</li>
                <li>Danpavault - barrel vault skylight</li>
                <li>Danpal Louvre - translucent shading</li>
                <li>Danpal VISTA - interior wall cladding with LED</li>
                <li>Interior ceilings and partitions</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Glazing Materials</h4>
          <ul className={`${textColorClass} small`}>
            <li>Danpalon 3DLITE - balances daylight through the day</li>
            <li>Danpalon Kinetic</li>
            <li>Danpalon Compact - total transparency, high impact resistance</li>
            <li>Danpalon Hyperclear - fully transparent panel</li>
          </ul>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <p className={textColorClass}>
            Danpal does not publish a postal address or phone number - enquiries go
            through the contact form on their site.
          </p>
          <p>
            <Link className={linkColor} to="https://danpal.com/contact-us/" target="_blank" rel="noopener noreferrer">danpal.com/contact-us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Danpal
