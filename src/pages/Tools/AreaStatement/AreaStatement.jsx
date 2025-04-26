import React,{useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const AreaStatement = () => {
    const {mode} = useContext(SchematicContext);

  return (
    <div className='container'>
       <h1 className={`text-${mode==='light'?'dark':'light'} my-4`}>Area Statement</h1>
    </div>
  )
}

export default AreaStatement
