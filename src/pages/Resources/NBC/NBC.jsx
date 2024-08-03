import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { GiJigsawBox } from "react-icons/gi";
import P1 from "../../../assets/NBC/Part1.svg";
import P2 from '../../../assets/NBC/Part2.svg'
import P3 from '../../../assets/NBC/Part3.svg';
import P4 from '../../../assets/NBC/Part4.svg'
import P5 from '../../../assets/NBC/Part5.svg';
import P6 from '../../../assets/NBC/Part6.svg';
import P7 from '../../../assets/NBC/Part7.svg';
import P8 from '../../../assets/NBC/Part8.svg';
import P9 from '../../../assets/NBC/Part9.svg';
import P10 from '../../../assets/NBC/Part10.svg';
import P11 from '../../../assets/NBC/Part11.svg';
import P12 from '../../../assets/NBC/Part12.svg';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import '../../../assets/CSS/NBC.css'
    
export default function NBC() {
  const {mode} = useContext(SchematicContext);

  return (
    <div className='container mb-3'>
    <h1 className={`text-${mode === 'light' ? 'dark' : 'light'} d-inline-flex mb-3`}>National Building Code of India (2016)</h1>
    <div className="row mb-4" data-bs-theme={mode}>
      <Link className='text-decoration-none' to='/resources/NBC/NBCPart0'>
         <div id="P0" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <GiJigsawBox color='grey' size={100}/>
             <h5 className="card-title">Part 0</h5>
             <p className="card-text">Prerequisite for Applying Provisions of the Code</p>
           </div>
         </div>
        </Link>
    </div>
    <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart1'>
         <div id="P1" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <img src={P1} className='img-fluid' width={100} alt="" />
             <h5 className="card-title">Part 1</h5>
             <p className="card-text">Definition</p>
           </div>
         </div>
        </Link>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart2'>
         <div id="P2" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P2} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 2</h5>
            <p className="card-text">Administration</p>
           </div>
         </div>
        </Link>
       </div>  
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart3'>
         <div id="P3" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P3} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 3</h5>
            <p className="card-text">Development Control Rules and General Building Requirements</p>
           </div>
         </div>
        </Link>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart4'>
         <div id="P4" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P4} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 4</h5>
            <p className="card-text">Fire and Life Safety</p>
           </div>
         </div>
        </Link>
       </div>
     </div>
     <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart5'>
         <div id="P5" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <img src={P5} className='img-fluid' width={100} alt="" />
             <h5 className="card-title">Part 5</h5>
             <p className="card-text">Building Materials</p>
           </div>
         </div>
        </Link>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart6'>
         <div id="P6" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P6} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 6</h5>
            <p className="card-text">Structural Design</p>
           </div>
         </div>
        </Link>
       </div>  
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart7'>
         <div id="P7" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P7} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 7</h5>
            <p className="card-text">Construction Management, Practices and Safety</p>
           </div>
         </div>
        </Link>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart8'>
         <div id="P8" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P8} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 8</h5>
            <p className="card-text">Building Services</p>
           </div>
         </div>
        </Link>
       </div>
     </div>
     <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart9'>
         <div id="P9" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <img src={P9} className='img-fluid' width={100} alt="" />
             <h5 className="card-title">Part 9</h5>
             <p className="card-text">Plumbing Services (including Solid Waste Management)</p>
           </div>
         </div>
        </Link>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart10'>
         <div id="P10" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P10} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 10</h5>
            <p className="card-text">Landscape Development,Signs and Outdoor Display Structures</p>
           </div>
         </div>
        </Link>
       </div>  
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart11'>
         <div id="P11" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P11} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 11</h5>
            <p className="card-text">Approach to Sustainability</p>
           </div>
         </div>
        </Link>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
       <Link className='text-decoration-none' to='/resources/NBC/NBCPart12'>
         <div id="P12" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P12} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 12</h5>
            <p className="card-text">Asset and Facility Management</p>
           </div>
         </div>
        </Link>
       </div>
     </div>
    </div>
  )
}
