import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { IoLogoLinkedin } from "react-icons/io";
import { FaGithub } from 'react-icons/fa';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';

export default function About() {
  const {mode} = useContext(SchematicContext);
  const textColor = mode === 'light' ? 'dark' : 'light';
  return (
    <div className={`min-vh-100 text-${textColor}`}>      
      {/* About Section */}
      <section className="py-5 px-4">
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* Main Content */}
            <div className="col-lg-8">
              <h1 className="display-5 fw-light mb-2">About Me</h1>
              <h2 className="h4 fw-medium mb-4">Hi, I'm Akshay Kamath — Developer of Schematically.</h2>

              <p className="lead text-secondary">
                With over a decade of experience in architectural design and spatial planning, I've witnessed firsthand the challenges young architects face when transitioning from academic theory to professional practice.
              </p>

              <p className="lead text-secondary">
                Schematically was born from a simple belief: that the next generation of architects deserves tools and resources that bridge the gap between imagination and execution. Through this platform, I aim to democratize access to architectural knowledge, foster collaboration, and empower emerging talents to build smarter, more sustainable spaces for our future.
              </p>

              <p className="lead text-secondary">
                My mission is to create a space where architectural innovation meets practical wisdom, where seasoned professionals share their insights, and where young architects can find the guidance they need to transform their visions into reality.
              </p>
            </div>

            {/* Bio Card */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className={`bg-${mode === 'light' ? 'light' : 'dark'} border rounded-4 p-4 shadow-sm position-sticky`} style={{ top: '2rem' }}>
                <div className="d-flex justify-content-center mb-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '8rem', height: '8rem', background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)' }}
                  >
                    <FaUser size={64} className="text-success" />
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <FaGraduationCap size={20} className="text-success me-2 mt-1" />
                  <div>
                    <h6 className={`mb-1 fw-medium text-${textColor}`}>Education</h6>
                    <small className={`d-block text-${textColor}`}>B.Arch, Computational Design</small>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <FaBriefcase size={20} className="text-success me-2 mt-1" />
                  <div>
                    <h6 className={`mb-1 fw-medium text-${textColor}`}>Experience</h6>
                    <small className={`d-block text-${textColor}`}>5+ Years in Architecture</small>
                  </div>
                </div>
              <div className='row gap-2'>
              <Link to="mailto:architect.ajk@gmail.com" className="btn btn-success w-100 mt-3 d-flex align-items-center justify-content-center gap-2">
                <FiMail size={16} /> Get in Touch
              </Link>
              </div>
              <div className='row gap-2'>
              <Link to="https://www.linkedin.com/in/akshay-j-kamath" target="_blank" rel="noopener noreferrer" className="col btn btn-primary w-50 mt-3 d-flex align-items-center justify-content-center gap-2">
                <IoLogoLinkedin size={16} /> LinkedIn
              </Link>
              <Link to="https://github.com/architectajk" target="_blank" rel="noopener noreferrer" className="col btn btn-secondary w-50 mt-3 d-flex align-items-center justify-content-center gap-2">
                <FaGithub size={16} /> Github
              </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-5 px-4" id="portfolio">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="h3 fw-light">Portfolio of Work</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '40rem' }}>
              Explore a curated collection of architectural projects spanning residential, commercial, and sustainable design initiatives.
            </p>
          </div>

          {/* iframe viewer */}
          <div className="ratio ratio-16x9 mb-5">
            <iframe
              title="Portfolio Flipbook Viewer"
              src="https://online.pubhtml5.com/dwuub/fupp/"
              allowFullScreen
              style={{ border: 'none' }}
            ></iframe>
          </div>

          {/* Mobile contact card */}
          <div className="d-lg-none">
            <div className="border border-success-subtle bg-success bg-opacity-10 rounded-4 p-4 text-center">
              <div
                className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                style={{ width: '6rem', height: '6rem', background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)' }}
              >
                <FaUser size={48} className="text-success" />
              </div>
              <h5 className="mb-1">Akshay Kamath</h5>
              <small className="text-muted">Founder, Schematically</small>
              <Link to="mailto:architect.ajk@gmail.com" className="btn btn-success w-100 mt-3 d-flex align-items-center justify-content-center gap-2">
                <FiMail size={16} /> Get in Touch
              </Link>
              <Link to="https://www.linkedin.com/in/akshay-j-kamath" target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 mt-3 d-flex align-items-center justify-content-center gap-2">
                <IoLogoLinkedin size={16} /> LinkedIn
              </Link>
              <Link to="https://github.com/architectajk" target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-100 mt-3 d-flex align-items-center justify-content-center gap-2">
                <FaGithub size={16} /> Github
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
