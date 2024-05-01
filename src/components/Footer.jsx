import {useContext} from 'react'
import { Link,NavLink } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import { Tooltip } from 'react-tooltip';
//<button className="btn" onClick={()=>{copyToClipboard();openMailTo();}}><GrMail size={24} color="grey"/></button>
const copyToClipboard = () => {
  const emailToCopy = 'architect.ajk@gmail.com';
  const tempInput = document.createElement('input');
  tempInput.value = emailToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
};

const openMailTo = () => {
  window.location.href = 'mailto:architect.ajk@gmail.com';
};

export default function Footer() {
  const {mode} = useContext(SchematicContext);
  const linkColor = `link-${mode==='dark'?'light':'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  return (
      <footer className={`container-fluid d-flex flex-wrap pt-3 border-top bg-${mode} mt-auto`}>
        <div className='container py-2 py-md-1 px-3 px-md-3'>
          <div className='row d-flex justify-content-between'>
            <div className="col-md-3 me-md-auto">
              <NavLink className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" to="/">
                <img className="me-2" src={mode==='dark' ? "../images/logo 1.png":"../images/logo 2.png"} alt="Logo" width="248" />
              </NavLink>
              <ul className={`list-unstyled small text-bg-${mode}`}>
                <li className="mb-2">Designed and Built with <Link className={linkColor} to="https://react.dev/" target="_blank" rel="noopener noreferrer">React</Link> and <Link className={linkColor} to="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">Bootstrap</Link></li>
                <li className="mb-2">Code Licensed <Link className={linkColor} to="https://github.com/architectajk/Schematically/blob/main/LICENSE.txt" target="_blank" rel="noopener noreferrer">MIT</Link>, All docs under <Link className={linkColor} to="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</Link> unless mentioned</li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul className="nav d-flex align-items-center justify-content-center list-unstyled">
                <li className="ms-3 ms-md-auto">
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <a id="my-anchor-element1">                   
                  <Link to="https://www.linkedin.com/in/akshay-j-kamath" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} color="grey"/></Link>                   
                  </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-element1" content="Linkedin"/>
                </li>
                <li className="ms-3"> 
                {/* eslint-disable jsx-a11y/anchor-is-valid */} 
                  <a id="my-anchor-element2">                    
                  <Link to="https://github.com/architectajk" target="_blank" rel="noopener noreferrer"><FaGithub size={24} color="grey"/></Link> 
                  </a>
                  {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-element2" content="Github"/>
                </li>
                <li className="ms-1">
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}          
                  <a id="my-anchor-element3">                     
                    <button className="btn" onClick={()=>{copyToClipboard();openMailTo();}}><GrMail size={24} color="grey"/></button>
                  </a>
                  {/* eslint-enable jsx-a11y/anchor-is-valid */}
                  <Tooltip anchorSelect="#my-anchor-element3" content="Copy Email"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  )
}