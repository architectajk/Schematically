import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import '../../assets/CSS/Tools.css'

export default function Tools() {
  const {mode} = useContext(SchematicContext);

  return (
    <>
     <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-4 mb-3 mb-sm-0">
         <div className={`card card-${mode} h-100`}>
           <div className="card-body d-flex flex-column">
             <h5 className="card-title">NBC / IBC Sanitation Requirements</h5>
             <p className="card-text d-flex flex-grow-1">As per the National Building Code, All Structures of Human occupancy shall have adequate sanitary facilities.</p>
             <div className="text-start">
              <Link to="/tools/SanReq" className="btn btn-primary">Start</Link>
             </div>
           </div>
         </div>
       </div>
       <div className="col-sm-4 mb-3 mb-sm-0">
         <div className={`card card-${mode} h-100`}>
           <div className="card-body d-flex flex-column">
             <h5 className="card-title">Natural Light and Ventilation Calculation</h5>
             <p className="card-text d-flex flex-grow-1">As per the International Residential Code, certain rooms within dwellings must be provided with a minimum amount of lighting and ventilation.</p>
             <div className="text-start">
              <Link to="/tools/NaturalLightVentCalc" className="btn btn-primary">Start</Link>
             </div>
           </div>
         </div>
       </div>  
       <div className="col-sm-4 mb-3 mb-sm-0">
         <div className={`card card-${mode} h-100`}>
           <div className="card-body d-flex flex-column">
             <h5 className="card-title">Elevator Planner/Size Matrix</h5>
             <p className="card-text">Plan the elevator configurations and shaft dimensions</p><p className="card-text text-success d-flex flex-grow-1">Coming soon....</p>
             <div className="text-start">
              <Link to="/tools/ElevatorPlanner" className="btn btn-primary">Start</Link>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-4 mb-3 mb-sm-0">
           <div className={`card card-${mode} h-100`}>
             <div className="card-body d-flex flex-column">
               <h5 className="card-title">Metal Weight Calculator</h5>
               <p className="card-text d-flex flex-grow-1"> Helps you determine the weight of metal of any size, whether rods, bars, or plates.</p>
               <div className="text-start">
                <Link to="/tools/MetalCalc" className="btn btn-primary">Start</Link>
               </div>
             </div>
           </div>
         </div>
         <div className="col-sm-4 mb-3 mb-sm-0">
           <div className={`card card-${mode} h-100`}>
             <div className="card-body d-flex flex-column">
               <h5 className="card-title">Scale Calculator</h5>
               <p className="card-text d-flex flex-grow-1">Helps you to find the scale between two objects or the size of scaled/real structures for a given scale. </p>
               <div className="text-start">
                <Link to="/tools/ScaleCalc" className="btn btn-primary">Start</Link>
               </div>
             </div>
           </div>
         </div>
         <div className="col-sm-4 mb-3 mb-sm-0">
           <div className={`card card-${mode} h-100`}>
             <div className="card-body d-flex flex-column">
               <h5 className="card-title">Fire and Life Safety</h5>
               <p className="card-text d-flex flex-grow-1">Specifies occupancy-wise classification, Constructional aspects, egress requirements and protection features that are necessary to minimise danger to life and property from fire.</p><p className="card-text text-success d-flex flex-grow-1">Coming soon....</p>
               <div className="text-start">
                <Link to="/tools/FireLifeSafety" className="btn btn-primary">Start</Link>
               </div>
             </div>
           </div>
         </div>
     </div>

  </>
  )
}
