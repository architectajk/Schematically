import React,{useContext, useState} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const elevatorCompanies=[
  { value: 1, label: "Kone"},
  { value: 2, label: "Otis"},
  { value: 3, label: "Schindler"},
  { value: 4, label: "Mitsubishi"},
  { value: 5, label: "Teknix"},
  { value: 6, label: "Johnson"},
]

const ElevatorPlanner = () => {
    const {mode} = useContext(SchematicContext);
    const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
    const [elevatorComp,setElevatorComp]=useState(1);

  return (
<div className="row gx-4">
<h1 className={`${textColorClass} d-flex my-4`}>Elevator Planner / Size Matrix</h1>
  <div className="col-lg-6 col-sm-auto">
    <div className='d-flex-column' data-bs-theme={mode}>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">Elevator Company</label>
          <select className="form-select" id="inputGroupSelect01" value={elevatorComp} onChange={(e)=>{setElevatorComp(e.target.value)}}>
          {elevatorCompanies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label className="input-group-text" htmlFor="inputGroupSelect02">Shaft Size</label>
          <select className="form-select" id="inputGroupSelect02">
          </select>
        </div>
    </div>
  </div>
  <div className="col-lg-6 col-sm-auto">

  </div>
</div>
  )
}

export default ElevatorPlanner
