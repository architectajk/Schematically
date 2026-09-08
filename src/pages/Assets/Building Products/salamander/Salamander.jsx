import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';
import SectionNav from '../../../../components/SectionNav';

// Follows the Nuvocotto detail-page pattern.
//
// !! PLACEHOLDER WORDMARK - READ BEFORE PUBLISHING !!
// The white band on the catalog card carries a TYPESET STAND-IN, not
// Salamander's real logo: the words set in Lato, because their actual mark is
// served from a CDN that could not be downloaded here. It is not their
// trademark artwork and should be replaced before this goes anywhere public.
//
// To fix, two steps:
//   1. Save a.storyblok.com/f/227108/300x65/41bd326b3a/logo_300x65w.png as
//      public/Products/Salamander/salamander-logo.png
//   2. Rerun make_catalog_image.py with --logo pointing at that file, and
//      point the BrandLogo `light` prop below at it too.
// The stand-in currently lives at salamander-logo-STANDIN.png; delete it once
// the real mark is in.
//
// Contact sourcing note: salamander-windows.in/contact lists six named staff
// with personal mobile numbers. Those are individuals' contact details, not
// company switchboards, so they are deliberately NOT reproduced here - the
// page links to their contact form instead. The address below is the company
// address from their own imprint. No Indian registered office is published on
// the site, so none is claimed.
const Salamander = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Salamander/Salamander_productcatalogimage.png" alt="Salamander uPVC windows and sliding doors" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>Salamander India</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>Salamander Industrie-Produkte GmbH</p>
          <p className={textColorClass}>
            German-engineered uPVC window and door profile systems - sliding
            doors, tilt-and-turn windows and bi-fold systems, built around
            thermal performance and long-term durability.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> uPVC Windows, Doors and Sliding Systems</li>
            <li className='my-1'><strong>Material:</strong> uPVC, Glass</li>
            <li className='my-1'><strong>Use:</strong> Residential and commercial fenestration: sliding doors, tilt-and-turn windows and bi-fold door systems</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`asset-product-sidebar col-lg-3 bg-${mode}`}>
          {/* Points at the STAND-IN wordmark, not the real mark - see the
              note at the top of this file. Repoint at salamander-logo.png
              once the official artwork is saved. */}
          <BrandLogo
            href="https://salamander-windows.in/"
            light="/Products/Salamander/salamander-logo-STANDIN.png"
            alt="Salamander logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://salamander-windows.in/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="salamander-anchor-01">
                  <Link to="https://www.linkedin.com/company/salamander-window-door-systems-india/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#salamander-anchor-01" content="Linkedin" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="salamander-anchor-02">
                  <Link to="https://www.instagram.com/salamander.india" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#salamander-anchor-02" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="salamander-anchor-03">
                  <Link to="https://www.facebook.com/SalamanderIndia/" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#salamander-anchor-03" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="salamander-anchor-04">
                  <Link to="https://www.youtube.com/@salamanderwindows" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#salamander-anchor-04" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'><SectionNav /></li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Sliding Doors</li>
              <li className='my-1'>Streamline60 Windows</li>
              <li className='my-1'>Smart Systems</li>
              <li className='my-1'>Bi-Fold Doors</li>
              <li className='my-1'>Tilt and Turn</li>
              <li className='my-1'>Colours &amp; Decors</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            Salamander Industrie-Produkte is a German manufacturer of uPVC
            profile systems for windows and doors. The company describes over a
            hundred years of heritage and five decades specifically in uPVC
            profile manufacturing, with products sold across more than seventy
            countries under a "Design in Germany" positioning.
          </p>
          <p className={textColorClass}>
            The relevant distinction for specification is that Salamander makes
            the profile system rather than the finished window: the extruded
            uPVC sections, reinforcement, gasketry and hardware interfaces are
            engineered as a system, and fabricators build windows from it. That
            is what allows consistent thermal and structural performance across
            fabricators, and it is why the range is described by system name -
            Streamline60, evolutionDrive - rather than by product model.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Sliding Doors</h5>
              <ul className={`${textColorClass} small`}>
                <li>evolutionDrive_60</li>
                <li>evolutionDrive_SF</li>
                <li>evolutionDrive_HST</li>
                <li>Streamline60 sliding</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Windows and Smart Systems</h5>
              <ul className={`${textColorClass} small`}>
                <li>Streamline60 windows</li>
                <li>Bi-fold door systems</li>
                <li>Tilt-and-turn window and door systems</li>
                <li>Laminate and foil colour options</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Company Headquarters</h5>
              <p className={textColorClass}>Salamander Industrie-Produkte GmbH, Jakob-Sigle-Strasse 58, 86842 Turkheim/Unterallgau, Germany</p>
              <p className={textColorClass}>Phone: +49 8245 52 0</p>
              <p className={textColorClass}>info@sip.de</p>
            </div>
          </div>
          <p className={textColorClass}>
            Salamander publish regional sales contacts for India rather than a
            registered Indian office address.
          </p>
          <p>
            <Link className={linkColor} to="https://salamander-windows.in/contact" target="_blank" rel="noopener noreferrer">Contact the India team</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Salamander
