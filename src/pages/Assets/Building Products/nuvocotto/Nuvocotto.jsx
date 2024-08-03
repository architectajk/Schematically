import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider'
//import NuvocottoJaali from './NuvocottoJaali';
import { TbWorldWww } from "react-icons/tb";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';

const Nuvocotto = () => {

  const {mode} = useContext(SchematicContext);
  const linkColor = `link-${mode==='dark'?'light':'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
    <div className="row g-1 mb-4" data-bs-theme={mode}>
      <div className='col'><img height={420} className="d-block w-100 object-fit-cover" src="/Assests/Nuvocotto/NuvocottoImages/img01.jpg" alt="" /></div>
      <div className='col'>
        <div className='row gy-1'>
        <img height={208} className="d-block w-100 object-fit-cover" src="/Assests/Nuvocotto/NuvocottoImages/img02.jpg" alt="" />
        <img height={208} className="d-block w-100 object-fit-cover" src="/Assests/Nuvocotto/NuvocottoImages/img05.jpg" alt="" />
        </div>
      </div>
      <div className='col'><img className="d-block w-100 object-fit-cover" height={420} src="/Assests/Nuvocotto/NuvocottoImages/img03.jpg" alt="" /></div>
      <div className='col'><img className="d-block w-100 object-fit-cover" height={420} src="/Assests/Nuvocotto/NuvocottoImages/img04.jpg" alt="" /></div>
    </div>
    <div className='row g-4' data-bs-theme={mode}>
      <div className={`h-50 col-lg-3 bg-${mode}`}>
        <div className='d-flex-column m-3 p-1 justify-content-center'>
          <Link className={linkColor} to="https://nuvocotto.com/" target="_blank" rel="noopener noreferrer">
            <img className="pb-3 img-fluid" src={mode==='dark'?'/Assests/Nuvocotto/NuvocottoImages/nuvocotto-logo-white.png':'/Assests/Nuvocotto/NuvocottoImages/nuvocotto-logo.png'} alt="" />
          </Link>
       </div>
       <ul className={`d-flex flex-column list-unstyled small text-bg-${mode} justify-content-start mx-3`}>
          <li><TbWorldWww/><Link className={`${linkColor} mx-2 `} to="https://nuvocotto.com/" target="_blank" rel="noopener noreferrer">Website</Link></li>
            <ul className="d-flex list-unstyled my-3">
                <li>
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <a id="my-anchor-01">                   
                  <Link to="https://www.linkedin.com/company/nuvocotto/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} color="grey"/></Link>                   
                  </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-01" content="Linkedin"/>
                </li>
                <li className="ms-3"> 
                {/* eslint-disable jsx-a11y/anchor-is-valid */} 
                  <a id="my-anchor-02">                    
                  <Link to="https://in.pinterest.com/nuvocotto/" target="_blank" rel="noopener noreferrer"><FaPinterest size={20} color="grey"/></Link> 
                  </a>
                  {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-02" content="Pinterest"/>
                </li>
                <li className="ms-3"> 
                {/* eslint-disable jsx-a11y/anchor-is-valid */} 
                  <a id="my-anchor-03">                    
                  <Link to="https://www.instagram.com/nuvocotto/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} color="grey"/></Link> 
                  </a>
                  {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-03" content="Instagram"/>
                </li>
                <li className="ms-3">
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}          
                  <a id="my-anchor-04">                     
                  <Link to="https://www.youtube.com/nuvocotto" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} color="grey"/></Link>
                  </a>
                  {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-04" content="Youtube"/>
                </li>
            </ul>
          <li className='my-3'>INFORMATION</li>
          <li className='my-3'>PRODUCTS</li>
            <ul className='d-flex flex-column list-unstyled'>
              <li className='my-1'>Roof Tiles</li>
              <li className='my-1'>Floor Tiles</li>
              <li className='my-1'>Wall Tiles</li>
              <li className='my-1'>Bricks/Jaali</li>
              <li className='my-1'>Dry Panel Systems</li>
              <li className='my-1'>Accessories</li>
            </ul>
      </ul>
      </div>
      <div className={`col-lg-8 col-sm-auto`}>
        <h2 className={textColorClass}>Product Info</h2>
        <p className={textColorClass}>Nuvocotto is dedicated to providing top-quality clay products for terracotta enthusiasts. Since starting in 1999, Nuvocotto has focused on creating terracotta that is fresh, sustainable, and innovative. The name "Nuvocotto" combines "Nuvo" (new) and "cotto" (terracotta). Today, Nuvocotto stands for better, smarter, and more sustainable terracotta products.</p>
        <p className={textColorClass}>Wide range of Terracotta Products - Roofing Tiles, Floor Tiles, Brick and Jaali and other surface cladding applications.</p>
        <hr className={`${textColorClass} mt-5`} />
        <h4 className={textColorClass}>Contact</h4>
        <div className='row'>
          <div className='col'>
            <h5 className={textColorClass}>Bengaluru</h5>
            <p className={textColorClass}>Phone: +91 97422 69790, +91 98862 63112</p>
            <p className={textColorClass}>sales.ka@nuvocotto.com</p>
          </div>
          <div className='col'>
            <h5 className={textColorClass}>Chennai</h5>
            <p className={textColorClass}>Phone: +91 99627 69790,+91 98848 69790</p>
            <p className={textColorClass}>sales.tn@nuvocotto.com</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h5 className={textColorClass}>Kochi</h5>
            <p className={textColorClass}>Phone: +91 95675 69790</p>
            <p className={textColorClass}>sales.kl@nuvocotto.com</p>
          </div>
          <div className='col'>
            <h5 className={textColorClass}>Hyderabad</h5>
            <p className={textColorClass}>Phone: +91 99080 69790</p>
            <p className={textColorClass}>sales.ts@nuvocotto.com</p>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h5 className={textColorClass}>Coimbatore</h5>
            <p className={textColorClass}>Phone: +91 99627 69790,+91 98848 69790</p>
            <p className={textColorClass}>sales.tn@nuvocotto.com</p>
          </div>
          <div className='col'>
            <h5 className={textColorClass}>Dubai</h5>
            <p className={textColorClass}>Phone: +971 50 331 7072, +971 50 107 7094</p>
            <p className={textColorClass}>sales.dubai@nuvocotto.com</p>
          </div>
        </div>
        <hr className={`${textColorClass} mt-5`} />
        <h5 className={textColorClass}>Roof Tiles</h5>
         <div className='row mb-4'>
            <div className='col-sm-3 mb-3 mb-sm-0'>
              <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/Euro-Chocolate-400-x-400-1.jpg"  alt="" />
            </div>
            <div className='col-sm-3 mb-3 mb-sm-0'>
              <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/Euro-Dark-Grey-400-x-400-1.jpg" alt="" />
            </div>
            <div className='col-sm-3 mb-3 mb-sm-0'>
              <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/Euro-Natural-Red-400-x-400-1.jpg" alt="" />
            </div>
            <div className='col-sm-3 mb-3 mb-sm-0'>
              <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/ficus-roof-tiles.jpg" alt="" />
            </div>
         </div> 
        <h5 className={textColorClass}>Floor Tiles</h5>
        <div className='row mb-4'>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-floor-tiles-cho.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-floor-tiles-cup.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-floor-tiles-nr.jpg"  alt="" />
          </div>
        </div>
        <h5 className={textColorClass}>Wall Tiles</h5>
        <div className='row mb-4'>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-wall-tiles-cap.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-wall-tiles-cho.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-wall-tiles-nr.jpg"  alt="" />
          </div>
        </div>
        <h5 className={textColorClass}>Bricks / Jaali</h5>
        <div className='row mb-4'>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/amber-jaali-1.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/camp-jallie.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/edan-jaali-1.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/five-hole-jaali.jpg"  alt="" />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/quadra-jaali-1.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/Star-jaali.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/tv-jaali.jpg"  alt="" />
          </div>
          <div className='col-sm-3 mb-3 mb-sm-0'>
            <img width={200} src="/Assests/Nuvocotto/NuvocottoImages/wings-jaali-1.jpg"  alt="" />
          </div>
        </div>
        <h5 className={textColorClass}>Dry Panel System</h5>
        <h5 className={textColorClass}>Accessories</h5>
        <hr className={`${textColorClass} mt-5`} />
        <h5 className={textColorClass}>Gallery</h5>
        <model-viewer slot="canvas" style={{ width: '700px', height: '500px',background: '#eeeeee'}} camera-orbit="45deg 55deg 4m" src="/Assests/Nuvocotto/Amber-Jaali.gltf" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="poster.webp" shadow-intensity="1">
        <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
        </div>
        </model-viewer>
      </div>
    </div>
    </div>
  )
}

export default Nuvocotto
