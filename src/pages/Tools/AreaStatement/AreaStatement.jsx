import React,{useContext, useState} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const AreaStatement = () => {
    const {mode} = useContext(SchematicContext);
    const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container'>
       <h1 className={`text-${mode==='light'?'dark':'light'} my-4`}>Area Statement</h1>
    </div>
  )
}

export default AreaStatement
