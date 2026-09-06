import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Follows the Nuvocotto detail-page pattern. The catalog image was generated
// from a supplied photograph to match the other cards: 572x768, white label
// band at x 100-571 / y 595-700 carrying the brand mark.
//
// Social links: VOX also lists LinkedIn, YouTube and Pinterest on their site,
// but those are rendered as script-driven buttons without plain hrefs, so only
// the two profiles whose handles are published as text are linked here.
const Vox = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/Vox/Vox_productcatalogimage.png" alt="VOX India ceiling and wall panel systems" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>VOX India</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>VOX</p>
          <p className={textColorClass}>
            Ceiling, wall panel, facade and flooring systems bringing European
            product design to the Indian market - modular, dry-fixed surfaces
            intended to install faster and need less maintenance than wet trades.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Ceiling Systems, Wall Panels, Facade Systems, Flooring</li>
            <li className='my-1'><strong>Material:</strong> PVC, SPC (Stone Plastic Composite), Composite Materials</li>
            <li className='my-1'><strong>Use:</strong> Residential and commercial ceilings, soffits, interior and exterior wall cladding, facades, and flooring</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* The VOX mark is white letterforms on a solid red panel
              (#E80808), so it reads correctly on both light and dark
              backgrounds and must NOT be recoloured. Passing the same file
              for both modes is what switches the invert filter off. */}
          <BrandLogo
            href="https://voxindia.co/"
            light="/Products/Vox/logo-vox.svg"
            dark="/Products/Vox/logo-vox.svg"
            alt="VOX India logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://voxindia.co/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="vox-anchor-01">
                  <Link to="https://www.instagram.com/vox.india.interior/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#vox-anchor-01" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="vox-anchor-02">
                  <Link to="https://www.facebook.com/vox.india.interiors/" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#vox-anchor-02" content="Facebook" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>False Ceilings</li>
              <li className='my-1'>Wall Panels</li>
              <li className='my-1'>Flooring</li>
              <li className='my-1'>Facades</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            VOX is a Polish interior design brand operating since 1989, with a
            portfolio spanning furniture, flooring, doors, and wall and facade
            systems sold in more than 50 countries. VOX India brings the surface
            systems side of that range - ceilings, wall panels, flooring and
            facades - to the Indian market.
          </p>
          <p className={textColorClass}>
            The products are modular and dry-fixed: panels clip or slot together on
            a concealed sub-frame rather than being plastered, screeded or tiled in
            place. That makes them quick to install and straightforward to remove
            or replace a section of, which is the main reason they get specified
            for retrofit and fast-turnaround interiors.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Interior</h5>
              <ul className={`${textColorClass} small`}>
                <li>False ceiling systems and soffits</li>
                <li>Interior wall panels</li>
                <li>Skirtings and trims</li>
                <li>Modular flooring</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Exterior</h5>
              <ul className={`${textColorClass} small`}>
                <li>Facade cladding systems</li>
                <li>Exterior wall panels</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>Registered Office - Bengaluru</h5>
              <p className={textColorClass}>No. 1202, 100 Feet Road, Domlur, Indiranagar, Bengaluru, Karnataka - 560008</p>
              <p className={textColorClass}>Helpline: +91 95285 00500</p>
              <p className={textColorClass}>WhatsApp: +91 63668 44251</p>
              <p className={textColorClass}>Monday - Saturday, 10:00 - 18:00 IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vox
