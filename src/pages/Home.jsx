import React, { useContext } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import { Link } from 'react-router-dom';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import { FiZap } from "react-icons/fi";
import "./Home.css"
import { ReactComponent as TopSVG } from '../assets/Frame2.svg';
import { ReactComponent as BottomSVG } from '../assets/Frame1.svg';

const HeroVisuals = () => {
  const topStyle = useSpring({
    loop: { reverse: true },
    to: { transform: 'translateY(-15px) scale(1.02)' },
    from: { transform: 'translateY(0px) scale(1)' },
    config: {
      duration: 3000,
      easing: easings.easeInOutSine,
    },
  });

  const bottomStyle = useSpring({
    loop: { reverse: true },
    to: { transform: 'translateY(15px) scale(1.02)' },
    from: { transform: 'translateY(0px) scale(1)' },
    config: {
      duration: 3000,
      easing: easings.easeInOutSine,
    },
    delay: 300,
  });

  return (
    <div>
      <animated.div
        className="d-none d-lg-block"
        style={{
          ...topStyle,
          maxHeight: '60vh',
          objectFit: 'contain',
          zIndex: 5,
          position: 'absolute',
          top: '30px',
          right: '3%',
        }}
      >
        <TopSVG />
      </animated.div>

      <animated.div
        className="d-none d-lg-block"
        style={{
          ...bottomStyle,
          maxHeight: '60vh',
          objectFit: 'contain',
          zIndex: 5,
          position: 'absolute',
          bottom: '10px',
          left: '3%',
        }}
      >
        <BottomSVG />
      </animated.div>
    </div>
  );
}

export default function Home() {
  const {mode} = useContext(SchematicContext);
  return (
<div className='overflow-x-hidden'>
<div style={{ position: 'relative', zIndex: 3 }}>
  <hr className='mt-0 mb-2'/>
  <p className={`font-monospace m-0 text-center text-secondary fs-6 `} style={{ backgroundColor: mode === 'light' ? '#eef1f6' : '#000000'}}>
    Trusted By Architects, Students And Vendors
  </p>
  <hr className='mt-2 mb-0'/>
</div>
<div className='container py-2 py-md-1'>
  <div className='my-lg-4'></div>
<div className="" style={{ minHeight: '80vh', overflow: 'hidden'}}>
    {/* Image: responsive on mobile and desktop */}
    <img
      src="./images/DotsBackground.png"
      alt=""
      className="position-absolute top-50 start-50 translate-middle d-block d-md-none w-100"
      style={{
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
        filter:mode === 'light'? 'brightness(1) contrast(0)': 'brightness(1) contrast(0.7)'
      }}
    />
    <img
      src="./images/DotsBackground.png"
      alt=""
      className="position-absolute top-50 start-50 translate-middle d-none d-md-block"
      style={{
        maxHeight: '120vh',
        objectFit: 'contain',
        zIndex: 0,
        opacity: mode === 'light' ? '0.2' : '1'
      }}
    />
    {/* Hero Content */}
    <div className="px-3 px-md-4 py-5 my-5 text-center text-white position-relative" style={{ zIndex: 10 }}>
      <h1 id='Title' style={{maxWidth: '650px'}} className={`lh-sm text-${mode === 'light' ? 'dark' : 'light'} mb-4 mx-auto text-center text-wrap`}>
        Revolutionize Your Design Process
      </h1>
        <HeroVisuals/>
      <p style={{maxWidth: '700px',color: mode === 'light' ? '#0000009E' : '#EFF7FF9E'}} className={`fs-6 fs-md-5 fw-medium mx-auto mb-5`}>
        Schematically offers a free-to-use platform intended for architects, students and vendors to streamline and enhance their design processes, crafted with intuitive tools and resources.
      </p>

      <div className='my-3'>
        <Link style={{ width: '180px' }} to="/tools" className="btn btn-primary">Start with Tools</Link>
      </div>
    </div>
  </div>
</div>
    <div className='my-4 py-4'></div>
    <div className={`row g-4 p-3`}>
        <div className='mb-3'>
          <h1 id='Title' style={{maxWidth: '850px'}} className={`text-center mx-auto lh-sm text-${mode==='light'?'dark':'light'}`}>Struggling with messy tools, confusing codes, and design pressure?</h1>
        </div>
        <div className="row g-3 d-flex justify-content-center" data-bs-theme={mode}>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className="d-flex justify-content-center">
                <div className='rounded-circle d-flex align-items-center justify-content-center' style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)'}}><FaUserGroup size={36} className='text-danger'/></div>
                </div>
                <h2 className="card-title">The Overwhelmed Student</h2>
                <p className="card-text d-flex flex-grow-1">"I'm an architecture student and I just want to make my designs better — but I end up overwhelmed trying to figure out zoning laws, building codes, and what details to use."</p>
             </div>
            </div>
          </div>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3 text-danger '><FaRegClock size={48}/></div>
                <h2 className="card-title">The Time Waster</h2>
                <p className="card-text d-flex flex-grow-1">"Every time I start a design, I waste hours redoing calculations or digging through old PDFs to find byelaws or formulas I've used before."</p>
             </div>
            </div>
          </div>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className="d-flex justify-content-center mb-3">
                  <div className='rounded-circle d-flex align-items-center justify-content-center' style={{ width: '4rem', height: '4rem', background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)'}}><FaLeaf size={36} className='text-success'/></div>
                </div>
                <h2 className="card-title">The Sustainability Seeker</h2>
                <p className="card-text d-flex flex-grow-1">"I care about sustainability, but I don't know where to start. I never get access to the right details or specs — and I end up using whatever I can copy."</p>
             </div>
            </div>
          </div>
        </div>
        <div style={{maxWidth: '850px'}} className='d-flex flex-column justify-content-center mx-auto'>
          <h3 className={`text-center mx-auto lh-sm text-${mode==='light'?'dark':'light'}`}>Here's the truth:</h3>
          <p className={`p-3 text-center fs-md-5 text-${mode==='light'?'dark':'light'} text-break`}>You don't need to be a "design genius" to produce great work. You just need the right tools, clarity, and real-world resources — delivered in a way that's designed for students and junior professionals, not just seasoned architects.</p>
        </div>
    </div>
    <div className='my-4 py-4'></div>
    <div className={`bg-${mode}`}>
    <div className='container'>
      <div className='row g-4 p-3'>
        <div className='mb-3'>
          <h1 id='Title' style={{maxWidth: '850px'}} className={`text-center mx-auto lh-sm text-${mode==='light'?'dark':'light'}`}>What if your design toolkit actually helped you move faster, think smarter, and build better?</h1>
        </div>
        <div className="row g-3 d-flex justify-content-center" data-bs-theme={mode}>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><FiTarget size={48}/></div>
                <h2 className="card-title">Confident Design Decisions</h2>
                <p className="card-text d-flex flex-grow-1">No more second-guessing codes or relying on classmates. With byelaws, codes, and calculators in one place, you can trust your choices.</p>
             </div>
            </div>
          </div>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><CiGlobe size={48}/></div>
                <h2 className="card-title">Sustainability Made Doable</h2>
                <p className="card-text d-flex flex-grow-1">Use real GreenBuild construction details and materials — not just ideas — to make sustainability a part of every project, even student ones.</p>
             </div>
            </div>
          </div>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><FiZap size={48}/></div>
                <h2 className="card-title">Everything in One Place</h2>
                <p className="card-text d-flex flex-grow-1">From drafting cheat sheets to block libraries to carbon-positive material specs, Schematically is your productivity control room.</p>
             </div>
            </div>
          </div>
        </div>
        <div style={{maxWidth: '850px'}} className='d-flex flex-column justify-content-center mx-auto'>
          <h3 className={`text-center mx-auto lh-sm text-${mode==='light'?'dark':'light'}`}>Forget endless folders and 10 tabs open.</h3>
          <p className={`p-3 text-center fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Schematically is a unified, modern workspace where technical accuracy, speed, and sustainability intersect.</p>
        </div>
       </div>
    </div>
    </div>
    <div className='my-4 py-4'></div>
    <div className={`row g-4 p-3`}>
          <h1 id='Title' className={`text-center lh-sm text-${mode==='light'?'dark':'light'}`}>Introducing Schematically</h1>
          <p className={`text-center fs-5 text-${mode==='light'?'dark':'light'} text-break mb-3`}>A smart, visual workspace with built-in tools, curated resources, and sustainable design assets for early-stage architects and vendors.</p>
          <p className={`text-center fs-4 text-${mode==='light'?'dark':'light'} text-break`}>How It Works in 3 Simple Steps</p>
        <div className="row g-3 d-flex justify-content-center" data-bs-theme={mode}>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100 p-3`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><FaSearch size={48}/></div>
                <h2 className="card-title">Search or Browse</h2>
                <p className="card-text d-flex flex-grow-1">Find the Tools, Resources, or GreenBuild Assets you need from our curated library</p>
             </div>
            </div>
          </div>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100 p-3`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><MdOutlineFileDownload size={48}/></div>
                <h2 className="card-title">Customize or Download</h2>
                <p className="card-text d-flex flex-grow-1">Use calculators, detail drawings, or templates exactly as they are or customize them</p>
             </div>
            </div>
          </div>
          <div className="col-md-3 mb-sm-0">
            <div className={`card card-${mode} h-100 p-3`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><FaRegSave size={48}/></div>
                <h2 className="card-title">Save & Organize</h2>
                <p className="card-text d-flex flex-grow-1">Keep your assets organized in your personal Schematically dashboard</p>
             </div>
            </div>
          </div>
        </div>
    </div>
    <div className='mt-4 d-flex flex-column justify-content-center mx-auto'>
      <h3 className={`text-center mx-auto lh-sm text-${mode==='light'?'dark':'light'}`}>Ready to build with speed, clarity, and sustainability?</h3>
      <p className={`p-3 text-center fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Join thousands of architecture students and professionals who are already building better, faster.</p>
    </div>
    <div className='my-4 py-4'></div>
    </div>
  )
}
