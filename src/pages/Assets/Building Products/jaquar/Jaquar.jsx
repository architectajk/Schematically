import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Text-forward version of the Nuvocotto detail-page pattern. Jaquar has only
// one image in the repo (the same portrait catalog tile used on /assets), so
// there is no 4-image hero strip and no product galleries here - a portrait
// image stretched into a full-width banner would crop to a useless sliver.
// Drop gallery rows in below "Product Range" once real product photos exist.
const Jaquar = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Jaquar/Jaquar_productcatalogimage.png" alt="Jaquar bathroom and lighting products" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>Jaquar</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>Jaquar Group</p>
          <p className={textColorClass}>
            Complete bathroom and lighting solutions - faucets, sanitaryware, showers,
            wellness products and architectural lighting, manufactured in India and
            sold across more than 55 countries.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Sanitaryware / Bathroom Fittings</li>
            <li className='my-1'><strong>Material:</strong> Ceramic, Brass, Stainless Steel, ABS</li>
            <li className='my-1'><strong>Use:</strong> Premium bathrooms, residential and commercial washrooms</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* The supplied Jaquar file is a JPEG on a solid WHITE background,
              not a transparent mark, so it cannot be recoloured for dark mode
              - inverting it would produce a black box. allowInvert={false}
              means it shows in light mode and hides in dark mode. To make it
              appear in dark mode, add a transparent white version as
              jaquar-logo-white.svg/png and pass it as `dark`. Their site
              serves an SVG at global.jaquar.com/Themes/Jaquar2025_V1/Content/
              images/logo.svg. Filename is URL-encoded because it has spaces. */}
          <BrandLogo
            href="https://www.jaquar.com/"
            light="/Products/Jaquar/jaquar%20group%20logo.jpg"
            allowInvert={false}
            alt="Jaquar Group logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://www.jaquar.com/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="jaquar-anchor-01">
                  <Link to="https://www.linkedin.com/company/jaquar-%26-company-private-limited/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#jaquar-anchor-01" content="Linkedin" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="jaquar-anchor-02">
                  <Link to="https://www.instagram.com/jaquarindia/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#jaquar-anchor-02" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="jaquar-anchor-03">
                  <Link to="https://www.facebook.com/jaquarglobal" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#jaquar-anchor-03" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="jaquar-anchor-04">
                  <Link to="https://www.youtube.com/jaquargroup" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#jaquar-anchor-04" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Faucets</li>
              <li className='my-1'>Sanitaryware</li>
              <li className='my-1'>Showers</li>
              <li className='my-1'>Shower Enclosures</li>
              <li className='my-1'>Bath Tubs &amp; Whirlpools</li>
              <li className='my-1'>Spas, Saunas &amp; Steam</li>
              <li className='my-1'>Water Heaters</li>
              <li className='my-1'>Accessories</li>
              <li className='my-1'>Lighting</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            Jaquar Group is an Indian manufacturer of complete bathroom and lighting
            solutions. The group operates three brands at different points in the
            market - Artize at the luxury end, Jaquar as the premium core range, and
            Essco as the value range - covering faucets, sanitaryware, showers,
            flushing systems, shower enclosures, bath tubs, whirlpools, spas, saunas,
            steam solutions, water heaters and bathroom accessories.
          </p>
          <p className={textColorClass}>
            Alongside bath, Jaquar manufactures an architectural and decorative
            lighting range covering indoor, outdoor and decorative fixtures - so a
            single specification can cover both the washroom fit-out and the
            lighting scheme.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Bath</h5>
              <ul className={`${textColorClass} small`}>
                <li>Faucets</li>
                <li>Sanitaryware</li>
                <li>Showers and shower panels</li>
                <li>Flushing systems</li>
                <li>Shower enclosures</li>
                <li>Bath tubs and whirlpools</li>
                <li>Spas, saunas and steam solutions</li>
                <li>Water heaters and accessories</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Light</h5>
              <ul className={`${textColorClass} small`}>
                <li>Decorative - chandeliers, pendants, floor, table and wall lamps</li>
                <li>Indoor - surface, recessed, linear, track and industrial</li>
                <li>Outdoor - street lights, bollards, projectors and garden lighting</li>
                <li>Lamps, drivers and LED strip</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Global Headquarters</h5>
              <p className={textColorClass}>Plot No. 3, Sector 11, IMT Manesar, Gurgaon, National Capital Region - 122050, India</p>
              <p className={textColorClass}>Phone: +91 124 4746800</p>
              <p className={textColorClass}>global@jaquar.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jaquar
