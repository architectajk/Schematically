import React,{useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const ElevatorPlanner = () => {
    const {mode} = useContext(SchematicContext);
  return (
    <div className='d-flex-column' data-bs-theme={mode}>
    <h1 className={`text-${mode==='light'?'dark':'light'} d-flex my-4`}>Elevator Planner / Size Matrix</h1>
    </div>
  )
}

export default ElevatorPlanner
