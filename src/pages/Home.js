import React,{useContext} from 'react'
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import "./Home.css"

export default function Home() {
  const {mode} = useContext(SchematicContext);
  return (
        <div  className='container d-flex flex-column'>
          <h1 id='Title' className={`d-inline lh-base text-${mode==='light'?'dark':'light'}`}>Simplifying your design concepts</h1> 
          <h2 className={`d-inline lh-base text-${mode==='light'?'dark':'light'} text-break`}>Schematically is a platform for everyone involved in design and construction</h2>
        </div>
  )
}
