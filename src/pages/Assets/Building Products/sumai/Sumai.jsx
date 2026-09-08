import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';
import SectionNav from '../../../../components/SectionNav';

// Follows the Nuvocotto detail-page pattern.
//
// Logo: sumai-logo.png is Sumai's real mark (supplied), 193x125 on a
// transparent background. It is MULTI-COLOUR - dark grey wordmark, a red dot,
// and the yellow/orange Spacewood device - which has one consequence worth
// knowing: in dark mode BrandLogo's fallback recolours it to a flat white
// silhouette, so the red and yellow are lost. That is legible and is the
// normal single-colour reversed treatment, but if Sumai publish a proper
// white-on-transparent variant, save it as sumai-logo-white.png and pass it
// as `dark` to keep the mark intact in both themes.
//
// sumai-logo-STANDIN.png is the old typeset placeholder. Nothing references
// it any more and it is safe to delete.
//
// Sourcing note: the homepage claims Sumai is "the only GreenPro certified
// doors in India". The certification itself is a checkable fact and is stated
// below; the "only in India" superlative is a marketing claim we cannot
// verify, so it is deliberately not repeated. Production figures are likewise
// attributed to the company rather than asserted.
const Sumai = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Sumai/Sumai_productcatalogimage.png" alt="Sumai engineered wooden doors" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>Sumai Doors</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>Spacewood Furnishers Pvt. Ltd.</p>
          <p className={textColorClass}>
            Factory-finished engineered wooden doors and pre-hung door sets -
            supplied as complete assemblies rather than made up on site.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Engineered Wooden Doors, Pre-Hung Sets and Frames</li>
            <li className='my-1'><strong>Material:</strong> Engineered Wood, HDF, Laminate, Veneer</li>
            <li className='my-1'><strong>Use:</strong> Main entrance, bedroom and bathroom doors; hotel and commercial corridors</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`asset-product-sidebar col-lg-3 bg-${mode}`}>
          <BrandLogo
            href="https://www.sumaidoors.com/"
            light="/Products/Sumai/sumai-logo.png"
            alt="Sumai Doors logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://www.sumaidoors.com/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="sumai-anchor-01">
                  <Link to="https://www.instagram.com/sumaidoors" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#sumai-anchor-01" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="sumai-anchor-02">
                  <Link to="https://www.facebook.com/sumaidoors/" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#sumai-anchor-02" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="sumai-anchor-03">
                  <Link to="https://www.youtube.com/@spacewoodfurnisherspvt.ltd1760" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#sumai-anchor-03" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'><SectionNav /></li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Classic Doors</li>
              <li className='my-1'>Skin Doors</li>
              <li className='my-1'>Premium Doors</li>
              <li className='my-1'>Designer Doors</li>
              <li className='my-1'>Pre-Hung Sets</li>
              <li className='my-1'>Frames &amp; Architraves</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            Sumai is the door brand of Spacewood Furnishers, a Nagpur-based
            manufacturer the company describes as having more than three decades
            in modular furniture. The doors are made in an automated plant and
            supplied finished to the specified dimensions, which is the core of
            the proposition: a factory-made door rather than a carpenter-made
            one.
          </p>
          <p className={textColorClass}>
            The distinction that matters on site is the pre-hung set. The leaf,
            frame, architraves, hinges and lock pocket arrive as one assembled
            unit with the mortising already cut, so there is no site-cutting and
            the alignment is set in the factory rather than negotiated on the
            wall. That is what removes the warping and out-of-square problems
            that come with hanging a door by hand.
          </p>
          <p className={textColorClass}>
            Panels are finished in Olefin - a UV-stable polymer foil the company
            notes is widely used in Japan - as well as high-pressure laminate,
            natural veneer and melamine skin.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Door Panels</h5>
              <ul className={`${textColorClass} small`}>
                <li>Classic doors</li>
                <li>Designer skin doors</li>
                <li>Premium doors</li>
                <li>Designer doors</li>
                <li>Plain flush doors</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Sets and Special Types</h5>
              <ul className={`${textColorClass} small`}>
                <li>Pre-hung doors and frames</li>
                <li>Flush and laminate doors</li>
                <li>Acoustic doors</li>
                <li>Fire-rated doors</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Construction and Standards</h4>
          <ul className={`${textColorClass} small`}>
            <li>LVL (laminated veneer lumber) stiles and rails</li>
            <li>Tubular infill core; 24-hour BWP HDF skins</li>
            <li>All four edges sealed with thick edge band and PUR adhesive against moisture ingress</li>
            <li>Screw-holding strength stated at 65kg anywhere on the panel</li>
            <li>Made to IS 2202, tested to IS 4020</li>
            <li>GreenPro certified; complies with E1 formaldehyde emission norms</li>
          </ul>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Head Office &amp; Factory - Nagpur</h5>
              <p className={textColorClass}>Plot No. SZ-25-1, MIDC Industrial Area, Butibori, Nagpur - 441122, Maharashtra</p>
              <p className={textColorClass}>Phone: +91 95455 58856</p>
              <p className={textColorClass}>marketing@spacewood.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sumai
