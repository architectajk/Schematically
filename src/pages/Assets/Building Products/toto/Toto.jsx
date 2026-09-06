import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Follows the Nuvocotto detail-page pattern.
//
// Assets: the supplied file was a finished social-media advert, not a plain
// photograph - TOTO wordmark burned in top-left and marketing copy across the
// middle. The catalog image was built by cropping the photo below the copy so
// no burned-in text survives, then lifting the wordmark out of the top-left
// and inverting it to black for the standard white band. That extracted mark
// is toto-logo.png. If you can get the official SVG from
// in.toto.com/wp-content/uploads/2022/07/logo.svg it will be sharper - drop it
// in and point BrandLogo at it.
//
// Contact details below come only from the footer of in.toto.com. Note their
// "where to buy" page lists hundreds of independent dealers; those are
// third-party retailers, not TOTO offices, so none of them are reproduced here.
const Toto = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Toto/Toto_productcatalogimage.png" alt="TOTO India sanitaryware and bathroom fittings" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>TOTO India</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>TOTO (TOTO LTD, Japan)</p>
          <p className={textColorClass}>
            Japanese sanitaryware and bathroom technology - toilets, WASHLET bidet
            seats, washbasins, faucets, showers and bathtubs, engineered around
            water efficiency, hygiene and cleaning technology.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Sanitaryware, WASHLET, Faucets, Showers and Bathtubs</li>
            <li className='my-1'><strong>Material:</strong> Ceramic, Brass, Acrylic</li>
            <li className='my-1'><strong>Use:</strong> Residential and commercial bathrooms, hospitality washrooms and public restrooms</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* Wordmark extracted from the supplied advert - black on transparent,
              so dark mode recolours it to white automatically. */}
          <BrandLogo
            href="https://in.toto.com/"
            light="/Products/Toto/toto-logo.png"
            alt="TOTO logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://in.toto.com/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="toto-anchor-01">
                  <Link to="https://www.linkedin.com/company/toto-india-pvt-ltd/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#toto-anchor-01" content="Linkedin" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="toto-anchor-02">
                  <Link to="https://www.instagram.com/totoindiapvtltd/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#toto-anchor-02" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="toto-anchor-03">
                  <Link to="https://www.facebook.com/TOTOIndiaPvtLtd" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#toto-anchor-03" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="toto-anchor-04">
                  <Link to="https://twitter.com/TOTOIndiaPvtLtd" target="_blank" rel="noopener noreferrer"><FaXTwitter size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#toto-anchor-04" content="X (Twitter)" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="toto-anchor-05">
                  <Link to="https://www.youtube.com/channel/UCY9Kyv7faw7in6FxpdrWS2w" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#toto-anchor-05" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>NEOREST</li>
              <li className='my-1'>WASHLET</li>
              <li className='my-1'>Toilets</li>
              <li className='my-1'>Washbasins</li>
              <li className='my-1'>Faucets &amp; Fittings</li>
              <li className='my-1'>Showers</li>
              <li className='my-1'>Bathtubs</li>
              <li className='my-1'>Accessories</li>
              <li className='my-1'>Public Restrooms</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            TOTO is a Japanese manufacturer of sanitaryware and bathroom
            technology, operating in India as TOTO India Pvt Ltd. The brand is
            best known for the WASHLET - an integrated bidet seat with a
            temperature-controlled cleansing spray - and for NEOREST, its flagship
            range where the washlet and pan are designed as a single sculpted
            object rather than a seat fitted onto a separate toilet.
          </p>
          <p className={textColorClass}>
            The company groups its engineering under the name CLEANOVATION:
            surface and flushing technologies aimed at keeping ceramics clean with
            less water and less chemical cleaning. Alongside the domestic range,
            TOTO supplies public-restroom systems, and its products are specified
            in hotels internationally.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Restroom</h5>
              <ul className={`${textColorClass} small`}>
                <li>NEOREST and NEOREST Collections</li>
                <li>WASHLET bidet seats</li>
                <li>ECOWASHER</li>
                <li>Toilets</li>
                <li>Washbasins</li>
                <li>Public restroom systems</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Fittings and Bathing</h5>
              <ul className={`${textColorClass} small`}>
                <li>Faucets and fittings</li>
                <li>Showers</li>
                <li>Bathtubs, including the Flotation Tub</li>
                <li>Accessories</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Head Office - Mumbai</h5>
              <p className={textColorClass}>1002, Kamla Executive Park, Opposite Vazir Glass Works, Andheri Kurla Road, Andheri (E), Mumbai - 400059, Maharashtra</p>
              <p className={textColorClass}>Phone: +91 22 43112111 / 112, +91 22 28325741 / 42</p>
            </div>
            <div className='col'>
              <h5 className={textColorClass}>Factory - Halol</h5>
              <p className={textColorClass}>Plot A, GIDC Phase II, Halol Industrial Area, Chandrapura, Halol, Panchmahal - 389350, Gujarat</p>
              <p className={textColorClass}>Phone: 02676 661511</p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Showroom - New Delhi</h5>
              <p className={textColorClass}>Building No. 63, Basement &amp; Upper Ground Floor, Ring Road, Lajpat Nagar III, New Delhi</p>
              <p className={textColorClass}>Phone: +91 11 43177300 / 301</p>
            </div>
          </div>
          <p>
            <Link className={linkColor} to="https://in.toto.com/where-to-buy/" target="_blank" rel="noopener noreferrer">Find a dealer</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Toto
