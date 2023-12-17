import React, {useState,useContext,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { BsFillHeartFill } from "react-icons/bs"
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';

export default function Navbar() {
  const {mode,toggleMode} = useContext(SchematicContext);
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isTransparent = window.scrollY <= 50;
      setNavbarTransparent(isTransparent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <nav className={`navbar sticky-top navbar-expand-lg navbar-${mode} ${navbarTransparent ? 'navbar-transparent' : ''}${mode === 'dark' ? 'bg-dark' : 'bg-light'}`}>
    <div className="container-fluid container-xl flex-wrap flex-lg-nowrap">
      <NavLink className="navbar-brand mx-2" to="/"><img src={mode==='dark' ? "../images/logo 1.png":"../images/logo 2.png"} alt="Logo" width="250" /></NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        {/*SideBar*/}
      <div className={`sidebar offcanvas offcanvas-start text-bg-${mode}`} tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header" data-bs-theme={mode}>
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Schematically.org</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav d-inline-flex pe-3 ms-auto mb-2 mb-lg-0">
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/tools">Tools</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/resources">Resources</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/assets">Assets</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item my-2 my-lg-0 mx-2"><div className='text-white text-bg-primary rounded-pill'><NavLink className="nav-link active mx-2" to="/donate"><BsFillHeartFill/> Donate</NavLink></div></li>
          </ul>
          <div className={`form-check form-switch flex align-items-center my-auto text-${mode==='dark'?'light':'dark'}`} >
            <input className="form-check-input" onClick={toggleMode} type="checkbox" role="switch" id="flexSwitchCheckChecked"defaultChecked/>
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Darkmode</label>
          </div>
        </div>
      </div>
    </div>
  </nav>
        <style>{`
        .navbar-transparent {
          background-color: transparent !important;
        }`}</style>
</>
  );
};
