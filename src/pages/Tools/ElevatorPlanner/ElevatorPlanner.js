import React,{useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const ElevatorPlanner = () => {
    const {mode} = useContext(SchematicContext);
    const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
  return (
    <div className='d-flex-column' data-bs-theme={mode}>
    <h1 className={`${textColorClass} d-flex my-4`}>Elevator Planner / Size Matrix</h1>
    </div>
  )
}

export default ElevatorPlanner
