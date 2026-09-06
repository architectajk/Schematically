import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaFacebook, FaYoutube, FaPinterest } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Text-forward version of the Nuvocotto detail-page pattern. Artize has only
// one image in the repo (the portrait catalog tile used on /assets), so there
// is no hero strip and no product galleries - a portrait image stretched into
// a full-width banner would crop to a useless sliver. Drop gallery rows in
// below "Product Range" once real product photos exist.
//
// Artize publishes toll-free numbers but no postal address on its own site.
// The Jaquar Group HQ address is NOT reused here - it isn't stated anywhere as
// Artize's address, so it would be an assumption, not a fact.
const Artize = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Artize/Artize_productcatalogimage.png" alt="Artize luxury bath fittings" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>Artize</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>Artize (Jaquar Group)</p>
          <p className={textColorClass}>
            The bespoke luxury bath brand of the Jaquar Group - sculptural faucets,
            showers, ceramics and wellness systems built around finish variety and
            craftsmanship.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Luxury Bath Fittings and Wellness Products</li>
            <li className='my-1'><strong>Material:</strong> Brass, Ceramic, Stainless Steel</li>
            <li className='my-1'><strong>Use:</strong> Luxury residential bathrooms, hospitality washrooms, spa and wellness spaces</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* Both supplied files are light-toned - white and gold (#d1ab65) -
              so the gold takes the light-mode slot as the only one visible on
              a pale background. It is still fairly low contrast there; a dark
              or black version would read better in light mode if Artize
              publish one. */}
          <BrandLogo
            href="https://www.artize.com/in/"
            light="/Products/Artize/logo-Artize-golden.png"
            dark="/Products/Artize/logo-Artize-white.png"
            alt="Artize logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://www.artize.com/in/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="artize-anchor-01">
                  <Link to="https://www.instagram.com/artize.in" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#artize-anchor-01" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="artize-anchor-02">
                  <Link to="https://www.facebook.com/artize.in" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#artize-anchor-02" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="artize-anchor-03">
                  <Link to="https://in.pinterest.com/ArtizeBornFromArt/" target="_blank" rel="noopener noreferrer"><FaPinterest size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#artize-anchor-03" content="Pinterest" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="artize-anchor-04">
                  <Link to="https://www.youtube.com/user/myartize" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#artize-anchor-04" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Faucets</li>
              <li className='my-1'>Showers</li>
              <li className='my-1'>Ceramics</li>
              <li className='my-1'>Wellness</li>
              <li className='my-1'>Accessories</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            Artize is the luxury bath brand of the Jaquar Group, positioned above
            the core Jaquar range and the value-focused Essco range. The brand
            works to a "Born From Art" design philosophy, with sculptural faucet
            and shower forms, a wide palette of metal finishes, and freestanding
            ceramics and tubs intended to be read as objects in the room rather
            than as fittings.
          </p>
          <p className={textColorClass}>
            The range is organised into two collections: Artize Signature at the
            top of the range, and Artize Select beneath it. Being part of the
            Jaquar Group means the after-sales and warranty network is shared with
            the parent brand, which is often the deciding factor on hospitality
            projects.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Collections</h5>
              <ul className={`${textColorClass} small`}>
                <li>Artize Signature</li>
                <li>Artize Select</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Categories</h5>
              <ul className={`${textColorClass} small`}>
                <li>Faucets</li>
                <li>Showers</li>
                <li>Ceramics</li>
                <li>Wellness</li>
                <li>Accessories</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Customer Care</h5>
              <p className={textColorClass}>Phone: 1800 121 6808 (toll free)</p>
            </div>
            <div className='col'>
              <h5 className={textColorClass}>Purchase Assistance</h5>
              <p className={textColorClass}>Phone: 1800 120 332222 (toll free)</p>
            </div>
          </div>
          <p>
            <Link className={linkColor} to="https://global.artize.com/find-us" target="_blank" rel="noopener noreferrer">Find a store</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Artize
