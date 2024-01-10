import React,{useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const FireLifeSafety = () => {
    const {mode} = useContext(SchematicContext);
  return (
    <div className='d-flex-column' data-bs-theme={mode}>
    <h1 className={`text-${mode==='light'?'dark':'light'} d-flex my-4`}>Fire and Life Safety</h1>
    </div>
  )
}

export default FireLifeSafety