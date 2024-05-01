import React,{useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';

const ParkingNormsNMC = () => {
    const {mode} = useContext(SchematicContext);
    const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
    return (
      <>
        <div>
          <h1 className={textColorClass}>National Medical Council</h1>
        </div>
      </>
    )
  }
  
export default ParkingNormsNMC