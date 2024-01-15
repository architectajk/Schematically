import {useContext} from 'react'
import { Link,NavLink } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';

const copyToClipboard = () => {
  const emailToCopy = 'architect.ajk@gmail.com';
  const tempInput = document.createElement('input');
  tempInput.value = emailToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
};

export default function Footer() {
  const {mode} = useContext(SchematicContext);
  return (
      <footer className={`container-fluid d-flex flex-wrap py-3 border-top bg-${mode==='dark'?'dark':'light'} mt-auto`}>
        <div className="container text-center">
          <div className='row mb-3 justify-content-center'>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <NavLink to="/"><img className="me-2 mb-md-0" src={mode==='dark' ? "../images/logo1_small.svg":"../images/logo2_small.svg"} alt="Logo" width="32" /></NavLink>
              <span className={`mb-md-0 text-${mode==='dark'?'light':'dark'}`}>© 2024-2025 Schematically, Inc.</span>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
            <ul className="nav justify-content-center align-items-center list-unstyled d-flex">
              <li><Link className={`btn text-${mode==='dark'?'light':'dark'}`} to="/about">Privacy Policy</Link></li>
              <li><Link className={`btn text-${mode==='dark'?'light':'dark'}`} to="/about">Terms of Services</Link></li>
            </ul>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <ul className="nav ms-lg-auto align-items-center list-unstyled">
                <li className="ms-3"><Link to="https://www.linkedin.com/in/akshay-j-kamath" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} color="grey"/></Link></li>
                <li className="ms-3"><Link to="https://github.com/architectajk" target="_blank" rel="noopener noreferrer"><FaGithub size={24} color="grey"/></Link></li>
                <li className="ms-1"><button className="btn" onClick={copyToClipboard}><GrMail size={24} color="grey"/></button></li>
            </ul>
            </div>
          </div>
        </div>
      </footer>
  )
}