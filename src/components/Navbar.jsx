import React, {useState,useContext,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { BsFillHeartFill } from "react-icons/bs"
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import '../assets/CSS/Navbar.css'

export default function Navbar() {
  const {mode,toggleMode} = useContext(SchematicContext);
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isTransparent = window.scrollY <= 10;
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
      <NavLink className="navbar-brand" to="/"><img className="img-fluid" src={mode==='dark' ? "/images/logo 1.png":"/images/logo 2.png"} alt="Logo" width="248" /></NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        {/*SideBar*/}
      <div className={`sidebar offcanvas offcanvas-end text-bg-${mode}`} tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header" data-bs-theme={mode}>
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Schematically.org</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav d-inline-flex ms-auto mb-2 mb-lg-0">
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/tools">Tools</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/resources">Resources</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/assets">Assets</NavLink></li>
            <li className="nav-item nav-underline my-1 my-lg-0 mx-2"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item my-2 my-lg-0"><div className='text-white text-bg-primary bg-gradient rounded-pill'><NavLink className="nav-link active mx-2 text-white" to="/donate"><BsFillHeartFill/> Donate</NavLink></div></li>
          </ul>
          <div className='d-flex-column align-items-center my-auto mx-3'>
            <label htmlFor="switch" className="toggle">
            <input type="checkbox" className="input" id="switch" onClick={toggleMode}/>
              <div className="icon icon--moon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20">
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                ></path>
                </svg>
              </div>
              <div className="icon icon--sun">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20">
                  <path
                    d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                  ></path>
                </svg>
              </div>
            </label>
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
