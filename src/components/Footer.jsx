import {useContext} from 'react'
import { Link,NavLink } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';

export default function Footer() {
  const {mode} = useContext(SchematicContext);
  return (
      <footer className={`container-fluid d-flex flex-wrap justify-content-center align-items-center py-3 border-top bg-${mode==='dark'?'dark':'light'} mt-auto`}>
        <div className="container d-flex"><NavLink><img src={mode==='dark' ? "../images/logo 1.png":"../images/logo 2.png"} alt="Logo" width="250" /></NavLink></div>
        <div className="container d-flex ">
        <div className='col-md-4 d-flex align-items-center py-2'>
          <span className={`mb-3 mb-md-0 text-${mode==='dark'?'light':'dark'}`}>© 2024-2025 Schematically, Inc. All rights reserved.</span>
        </div>
        <div className="container d-flex justify-content-end ">
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3 "><Link to="https://www.linkedin.com/in/akshay-j-kamath" target="_blank" rel="noopener noreferrer"><FaLinkedin size={25} color="grey"/></Link></li>
            <li className="ms-3"><Link><FaInstagram size={25} color="grey"/></Link></li>
          </ul>
        </div>
        </div>
      </footer>
  )
}