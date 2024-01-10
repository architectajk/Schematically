import React,{useContext} from 'react'
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import "./Home.css"
import image1 from '../assets/nathan-waters-j7q-Z9DV3zw-unsplash.jpg'
import image2 from '../assets/ricardo-gomez-angel-jIh1QFf1naY-unsplash.jpg'

export default function Home() {
  const {mode} = useContext(SchematicContext);
  return (
    <>
    <div className="row gx-4">
      <div className="col-lg-6 col-sm-auto my-4">
        <div className='mb-3'>
          <h1 id='Title' className={`d-inline lh-sm text-${mode==='light'?'dark':'light'}`}>Revolutionize Your Design Process</h1>
        </div>
        <p className={`d-inline fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Schematically offers a free-to-use platform intended for architects, students and vendors to streamline and enhance their design processes, crafted with intuitive tools and resources. We're community-supported - feel free to contribute and extend your support through available donation links.</p>
       </div>
       <div className="col-lg-6 col-sm-auto my-4 d-flex justify-content-center">
          <img className="img-fluid" src={image1} width="400"alt="" />
       </div>
    </div>
    <div className="container">
        <div className='mb-3'>
          <h1 id='Title' className={`text-center lh-sm text-${mode==='light'?'dark':'light'}`}>How Schematically Simplifies Design</h1>
        </div>
        <p className={`text-center fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Our platform simplifies complex concepts and enhances your workflow. Here's how Schematically can improve your design process:</p>
        <div className="row mb-3" data-bs-theme={mode}>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title">Step 1: Simplify Concepts</h4>
                <p className="card-text d-flex flex-grow-1">Our platform simplifies complex design concepts, freeing you from the heavy weights of traditional design ideologies, and letting your creativity flow.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex  flex-column">
                <h4 className="card-title">Step 2: Utilize Tools, Resources & Assets</h4>
                <p className="card-text d-flex flex-grow-1">Empowered with sophisticated tools, seamlessly integrated resources and high-quality assets, Schematically supports every phase of your design process.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title">Step 3: Improve Design Process</h4>
                <p className="card-text d-flex flex-grow-1">Schematically aids in refining your design process, encourages collaboration and provides a platform to showcase your work, gain exposure and receive valuable feedback.</p>
             </div>
            </div>
          </div>
        </div>
    </div>
    <div className="row gx-4">
      <div className="col-lg-6 col-sm-auto my-4 d-flex justify-content-center">
          <img className="img-fluid" src={image2} width="400" alt="" />
       </div>
      <div className="col-lg-6 col-sm-auto my-4">
        <div className='mb-3'>
          <h1 className={`d-inline lh-sm text-${mode==='light'?'dark':'light'}`}>Why Choose Schematically?</h1>
        </div>
        <p className={`d-inline fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Schematically is a platform that caters to the diverse needs of architects, students, and vendors. Discover the unparalleled benefits of our architectural design platform:</p>
        <ul className={`text-${mode==='light'?'dark':'light'}`}>
          <li>Free for everyone to use</li>
          <li>Collision of ideas from skilled architects and students around the globe</li>
          <li>Supports collaborative work</li>
          <li>Opportunity to support the community using donation links</li>
        </ul>
       </div>
    </div>
    <div className="container">
        <div className='mb-3'>
          <h1 id='Title' className={`text-center lh-sm text-${mode==='light'?'dark':'light'}`}>Key Features</h1>
        </div>
        <p className={`text-center fs-5 text-${mode==='light'?'dark':'light'} text-break`}>Explore the unique features integrated into Schematically, designed to fuel your creativity and expedite your design process:</p>
        <div className="row mb-4" data-bs-theme={mode}>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title">Calculations</h4>
                <p className="card-text d-flex flex-grow-1">Our platform simplifies complex design concepts, freeing you from the heavy weights of traditional design ideologies, and letting your creativity flow.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title">Extensive Resources / Asset Library</h4>
                <p className="card-text d-flex flex-grow-1">Empowered with sophisticated tools, seamlessly integrated resources and high-quality assets, Schematically supports every phase of your design process.</p>
             </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode} h-100`}>
              <div className="card-body text-center d-flex flex-column">
                <h4 className="card-title">Collaboration and Productivity</h4>
                <p className="card-text d-flex flex-grow-1">Schematically aids in refining your design process, encourages collaboration and provides a platform to showcase your work, gain exposure and receive valuable feedback.</p>
             </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
