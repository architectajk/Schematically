import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import BrandLogo from '../../../../components/BrandLogo';

// Follows the Nuvocotto detail-page pattern. The catalog image was generated
// from a supplied photograph to match the other cards: 572x768, white label
// band at x 100-571 / y 595-700 carrying the brand mark.
//
// Note on sourcing: carboncraftdesign.com/contact carries Wix template
// boilerplate referring to "carbon fibre expertise". CarbonCraft does not
// make carbon fibre - they upcycle recovered carbon black - so that wording
// is deliberately not repeated here.
const CarbonCraft = () => {

  const { mode } = useContext(SchematicContext);
  const linkColor = `link-${mode === 'dark' ? 'light' : 'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
      <div className='row g-4 mb-4 align-items-center' data-bs-theme={mode}>
        <div className='col-lg-3'>
          <img className='img-fluid w-100' src="/Products/CarbonCraft/CarbonCraft_productcatalogimage.png" alt="Carbon Craft Design carbon-upcycled tiles" />
        </div>
        <div className='col-lg-8'>
          <h1 className={textColorClass}>Carbon Craft Design</h1>
          <p className={`${textColorClass} opacity-75 mb-3`}>CarbonCraft</p>
          <p className={textColorClass}>
            Handcrafted tiles and building surfaces made from upcycled carbon -
            turning a waste stream that would otherwise be burnt as kiln fuel into
            a specifiable interior finish.
          </p>
          <ul className={`list-unstyled small ${textColorClass} mb-0`}>
            <li className='my-1'><strong>Category:</strong> Carbon-Upcycled Tiles, Cladding and Surfaces</li>
            <li className='my-1'><strong>Material:</strong> Recovered Carbon Black (rCB), Industrial Waste Byproducts</li>
            <li className='my-1'><strong>Use:</strong> Interior floors and walls, feature cladding, murals and decorative surfaces</li>
          </ul>
        </div>
      </div>

      <div className='row g-4' data-bs-theme={mode}>
        <div className={`h-50 col-lg-3 bg-${mode}`}>
          {/* Single black mark on a transparent background, so dark mode
              recolours it to white automatically.
              NOTE: this file is 3508x2480px / 276KB - a print-resolution
              asset being displayed at 48px tall. Worth resizing to roughly
              300px wide before this ships, to save the page weight. */}
          <BrandLogo
            href="https://www.carboncraftdesign.com/"
            light="/Products/CarbonCraft/logo-carboncraft.png"
            alt="CarbonCraft logo"
          />
          <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
            <li>
              <TbWorldWww />
              <Link className={`${linkColor} mx-2`} to="https://www.carboncraftdesign.com/" target="_blank" rel="noopener noreferrer">Website</Link>
            </li>
            <ul className="d-flex list-unstyled my-3">
              <li>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="carboncraft-anchor-01">
                  <Link to="https://www.linkedin.com/company/carboncraftdesign/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#carboncraft-anchor-01" content="Linkedin" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="carboncraft-anchor-02">
                  <Link to="https://www.instagram.com/carboncraft_/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#carboncraft-anchor-02" content="Instagram" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="carboncraft-anchor-03">
                  <Link to="https://www.facebook.com/carboncraftdesign/" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#carboncraft-anchor-03" content="Facebook" />
              </li>
              <li className="ms-3">
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a id="carboncraft-anchor-04">
                  <Link to="https://www.youtube.com/@carboncraftdesign7491" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey" /></Link>
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                <Tooltip anchorSelect="#carboncraft-anchor-04" content="Youtube" />
              </li>
            </ul>
            <li className='my-3'>INFORMATION</li>
            <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>CarbonCraft Tile</li>
              <li className='my-1'>Deewaar</li>
              <li className='my-1'>Carbon Mural</li>
              <li className='my-1'>Handicraft</li>
              <li className='my-1'>Reverse Chimney</li>
            </ul>
          </ul>
        </div>

        <div className={`col-lg-8 col-sm-auto`}>
          <h2 className={textColorClass}>Product Info</h2>
          <p className={textColorClass}>
            CarbonCraft started as a Goa-based material innovation studio and
            launched Carbon Tile in January 2020 - by their account the first tile
            made using upcycled carbon. The feedstock is recovered carbon black
            (rCB), the solid residue left when waste tyres are broken down by
            pyrolysis. India generates roughly 100 million waste tyres a year, and
            until recently rCB had no use other than being burnt as cheap fuel in
            cement and brick kilns, which pushes particulate matter back into the
            air around those plants.
          </p>
          <p className={textColorClass}>
            The tiles are handcrafted rather than pressed and fired, with patterns
            drawn from Indian cities and their industries, and are intended for
            interior applications from floors to walls. The company frames this as
            an architectural intervention rather than a purely technical one: the
            construction industry is the largest consumer of raw materials, so
            routing a waste stream into a commonly specified finish is what gives
            the approach scale.
          </p>
          <p className={textColorClass}>
            The wider range now runs beyond tiles to Deewaar bricks, Carbon Murals
            and handicraft objects, produced through what the company calls MATR
            Made Technology - a low-energy process for turning industrial waste and
            construction debris into tiles, bricks and panels.
          </p>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Product Range</h4>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Surfaces</h5>
              <ul className={`${textColorClass} small`}>
                <li>CarbonCraft Tile - handcrafted carbon-upcycled tiles</li>
                <li>Deewaar - carbon-negative brick and wall system</li>
                <li>Carbon Mural - bespoke wall artwork panels</li>
              </ul>
            </div>
            <div className='col-md-6'>
              <h5 className={textColorClass}>Other</h5>
              <ul className={`${textColorClass} small`}>
                <li>Handicraft - objects and accessories</li>
                <li>Reverse Chimney</li>
                <li>MATR Made Technology - the underlying process</li>
              </ul>
            </div>
          </div>

          <hr className={`${textColorClass} mt-5`} />
          <h4 className={textColorClass}>Contact</h4>
          <div className='row'>
            <div className='col'>
              <h5 className={textColorClass}>CarbonCraft HQ - Bengaluru</h5>
              <p className={textColorClass}>Atria University, 204, 1st Main Rd, AGS Colony, Anandnagar, Hebbal, Bengaluru, Karnataka 560024</p>
              <p className={textColorClass}>Phone: +91 99203 80340</p>
              <p className={textColorClass}>info@carboncraftdesign.com</p>
              <p className={textColorClass}>Monday - Saturday, 09:30 - 19:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarbonCraft
