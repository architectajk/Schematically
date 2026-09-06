import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube, FaPinterest } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Text-forward version of the Nuvocotto detail-page pattern. TOSTEM has only
// one image in the repo (the same portrait catalog tile used on /assets), so
// there is no 4-image hero strip and no product galleries here - a portrait
// image stretched into a full-width banner would crop to a useless sliver.
// Drop gallery rows in below "Product Range" once real product photos exist.
const Tostem = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Tostem/TostemImages/Tostem_productcatalogimage.png" alt="TOSTEM India aluminium windows and doors" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>TOSTEM India</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>TOSTEM (LIXIL Group, Japan)</p>
          <p className={textColorClass}>
            Japanese-engineered aluminium windows, doors and facades - pre-engineered
            system fenestration built around weather performance, sound insulation
            and surface durability.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Aluminium Doors, Windows, Facades</li>
            <li className='my-1'><strong>Material:</strong> Aluminium, Glass</li>
            <li className='my-1'><strong>Use:</strong> Residential and commercial fenestration - high-performance windows, sliding and casement doors, facades</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* A proper pair: black mark for light mode, white for dark.
              Note logo-tostemindia-black.png is actually a WebP file with a
              .png extension - browsers sniff the content and render it fine,
              but the server will label it image/png. Renaming it to .webp
              would be tidier. */}
          <BrandLogo
            href="https://www.tostemindia.com/"
            light="/Products/Tostem/TostemImages/logo-tostemindia-black.png"
            dark="/Products/Tostem/TostemImages/logo-tostemindia-white.png"
            alt="TOSTEM India logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://www.tostemindia.com/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="tostem-anchor-01">
                  <Link to="https://www.linkedin.com/company/tostem-india/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#tostem-anchor-01" content="Linkedin" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="tostem-anchor-02">
                  <Link to="https://www.instagram.com/tostem_india/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#tostem-anchor-02" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="tostem-anchor-03">
                  <Link to="https://www.pinterest.com/tostem_india/" target="_blank" rel="noopener noreferrer"><FaPinterest size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#tostem-anchor-03" content="Pinterest" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="tostem-anchor-04">
                  <Link to="https://www.facebook.com/Tostem-India-102425725097107" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#tostem-anchor-04" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="tostem-anchor-05">
                  <Link to="https://www.youtube.com/channel/UCdyM03obN4lmnsI9X1gEQWA" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#tostem-anchor-05" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Aluminium Windows</li>
              <li className='my-1'>Aluminium Doors</li>
              <li className='my-1'>Steel Entrance Doors</li>
              <li className='my-1'>Airflow System</li>
              <li className='my-1'>Facades</li>
              <li className='my-1'>Interior</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            TOSTEM is the window and door brand of the LIXIL Group of Japan, operating
            in India as LIXIL Window Systems Private Limited. The range is built on
            pre-engineered system windows - profiles, hardware, gaskets and glazing
            are designed and tested together as one assembly rather than fabricated
            ad hoc on site, which is what allows the published air, water and acoustic
            performance figures to hold.
          </p>
          <p className={textColorClass}>
            Products are offered in four series - Grants, ATIS, We Plus and We 70 -
            spanning sliding, casement, awning, fixed, French, tilt-and-slide, slit
            and vertical sliding windows, plus sliding, casement, French, bi-fold,
            corner-slider and ventilation doors. Anodised and coated aluminium
            finishes address surface durability in humid and coastal conditions.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Windows</h5>
              <ul className={`${textColorClass} small`}>
                <li>Sliding and vertical sliding</li>
                <li>Casement and French</li>
                <li>Awning and hung</li>
                <li>Fixed and slit</li>
                <li>Glass-to-glass corner</li>
                <li>Tilt and slide</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Doors and Facades</h5>
              <ul className={`${textColorClass} small`}>
                <li>Sliding, casement and French doors</li>
                <li>Bi-fold, slide-and-fold and corner slider</li>
                <li>GIESTA steel entrance doors</li>
                <li>Ventilation doors, slots and louvers</li>
                <li>Curtain wall and store front facades</li>
                <li>Interior hanging and swing doors, fixed dividers</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Corporate Office - Gurgaon</h5>
              <p className={textColorClass}>LIXIL Window Systems Private Limited, Plot No. 75, Sector 8, IMT Manesar, Gurgaon, Haryana 122050</p>
              <p className={textColorClass}>Phone: 1800 103 6855 (toll free)</p>
              <p className={textColorClass}>support.lwsindia@lixil.com</p>
            </div>
            <div className='col'>
              <h5 className={textColorClass}>Showroom - Mumbai</h5>
              <p className={textColorClass}>TOSTEM Studio, Nyay Sagar, 29 Jagat Vidya Marg, MIG Colony, Bandra East, Mumbai, Maharashtra 400051</p>
              <p className={textColorClass}>Phone: 1800 103 6855 (toll free)</p>
              <p className={textColorClass}>support.lwsindia@lixil.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tostem
