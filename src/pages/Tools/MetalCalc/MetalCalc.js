import React,{useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const MetalCalc = () => {
    const {mode} = useContext(SchematicContext);
  return (
    <div className='d-flex-column' data-bs-theme={mode}>
    <h1 className={`text-${mode==='light'?'dark':'light'} d-flex my-4`}>Metal Calculation</h1>
    </div>
  )
}

export default MetalCalc
