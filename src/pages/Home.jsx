import React,{useContext} from 'react'
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import { ImCalculator } from "react-icons/im";
import { IoLibrary } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { PiNumberCircleOneFill } from "react-icons/pi";
import { PiNumberCircleTwoFill } from "react-icons/pi";
import { PiNumberCircleThreeFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import "./Home.css"
import image1 from '../assets/nathan-waters-j7q-Z9DV3zw-unsplash.jpg'
import image2 from '../assets/ricardo-gomez-angel-jIh1QFf1naY-unsplash.jpg'

export default function Home() {
  const {mode} = useContext(SchematicContext);
  return (
    <>
    <div className={`row gx-4 p-3 bg-${mode} rounded-5`}>
      <div className="col-lg-6 col-sm-auto my-4">
        <h1 id='Title' className={`lh-sm text-${mode==='light'?'dark':'light'} mb-3`}>Revolutionize Your Design Process</h1>
        <p className={`d-inline fs-5 text-${mode==='light'?'dark':'light'}`}>Schematically offers a free-to-use platform intended for architects, students and vendors to streamline and enhance their design processes, crafted with intuitive tools and resources.</p>
       </div>
       <div className="col-lg-6 col-sm-auto my-4 d-flex justify-content-center">
          <img className="img-fluid" src={image1} alt="" />
       </div>
    </div>
    <div className='my-5'></div>
    <div className={`row gx-4 p-3 bg-${mode} rounded-5`}>
        <div className='mb-3'>
          <h1 id='Title' className={`text-center lh-sm text-${mode==='light'?'dark':'light'}`}>How Schematically Simplifies Design</h1>
        </div>
        <p className={`text-center fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Our platform simplifies complex concepts and enhances your workflow. Here's how Schematically can improve your design process:</p>
        <div className="row my-3 d-flex justify-content-center" data-bs-theme={mode}>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><PiNumberCircleOneFill size={48}/></div>
                <h2 className="card-title">Step 1: Simplify Concepts</h2>
                <p className="card-text d-flex flex-grow-1">Our platform simplifies complex design concepts, freeing you from the heavy weights of traditional design ideologies, and letting your creativity flow.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><PiNumberCircleTwoFill size={48}/></div>
                <h2 className="card-title">Step 2: Utilize Tools, Resources & Assets</h2>
                <p className="card-text d-flex flex-grow-1">Empowered with sophisticated tools, seamlessly integrated resources and high-quality assets, Schematically supports every phase of your design process.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><PiNumberCircleThreeFill size={48}/></div>
                <h2 className="card-title">Step 3: Improve Design Process</h2>
                <p className="card-text d-flex flex-grow-1">Schematically aids in refining your design process, encourages collaboration and provides a platform to showcase your work, gain exposure and receive valuable feedback.</p>
             </div>
            </div>
          </div>
        </div>
    </div>
    <div className='my-5'></div>
    <div className={`row gx-4 p-3 bg-${mode} rounded-5`}>
      <div className="col-lg-6 col-sm-auto my-4 d-flex justify-content-center">
          <img className="img-fluid" src={image2} width="400" alt="" />
       </div>
      <div className="col-lg-6 col-sm-auto my-4">
        <div className='mb-3'>
          <h1 className={`d-inline lh-sm text-${mode==='light'?'dark':'light'}`}>Why Choose Schematically?</h1>
        </div>
        <p className={`d-inline fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Schematically is a platform that caters to the diverse needs of architects, students, and vendors. Discover the unparalleled benefits of our architectural design platform:</p>
        <ul className='my-4 list-group fs-5'>
          <li className={`list-group-item border-0 bg-transparent text-${mode==='light'?'dark':'light'}`}><FaCheckCircle /> Free for everyone to use</li>
          <li className={`list-group-item border-0 bg-transparent text-${mode==='light'?'dark':'light'}`}><FaCheckCircle /> Collision of ideas from skilled architects and students around the globe</li>
          <li className={`list-group-item border-0 bg-transparent text-${mode==='light'?'dark':'light'}`}><FaCheckCircle /> Opportunity to support the community using donation links</li>
        </ul>
       </div>
    </div>
    <div className='my-5'></div>
    <div className={`row gx-4 p-3 bg-${mode} rounded-5 mb-4`}>
        <div className='my-4'>
          <h1 id='Title' className={`text-center lh-sm text-${mode==='light'?'dark':'light'}`}>Key Features</h1>
          <p className={`text-center fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Explore the unique features integrated into Schematically, designed to fuel your creativity and expedite your design process:</p>
        </div>
        <div className="row mb-4 d-flex justify-content-center" data-bs-theme={mode}>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100 p-3`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><ImCalculator size={48}/></div>
                <h2 className="card-title">Calculations</h2>
                <p className="card-text d-flex flex-grow-1">Our platform simplifies complex design concepts, freeing you from the heavy weights of traditional design ideologies, and letting your creativity flow.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100 p-3`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><IoLibrary size={48}/></div>
                <h2 className="card-title">Extensive Resources / Asset Library</h2>
                <p className="card-text d-flex flex-grow-1">Empowered with sophisticated tools, seamlessly integrated resources and high-quality assets, Schematically supports every phase of your design process.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-3 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100 p-3`}>
              <div className="card-body text-center d-flex flex-column">
                <div className='mb-3'><FaUsersGear size={48}/></div>
                <h2 className="card-title">Collaboration and Productivity</h2>
                <p className="card-text d-flex flex-grow-1">Schematically aids in refining your design process, encourages collaboration and provides a platform to showcase your work, gain exposure and receive valuable feedback.</p>
             </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
