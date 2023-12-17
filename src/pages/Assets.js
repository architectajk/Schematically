import React,{useContext} from 'react'
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';

export default function Assets() {
  const {mode} = useContext(SchematicContext);
  return (
    <div className='d-flex'>
      <h1 className={`text-${mode==='light'?'dark':'light'}`}>Coming Soon..</h1>
    </div>
  )
}
