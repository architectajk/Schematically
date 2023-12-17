import React, {useContext} from 'react'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';


export default function Alert() {
  const {alert} = useContext(SchematicContext);
  return (
    <div className='d-flex'>
        {alert && <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x border-0 my-5" role="alert" aria-live="assertive" aria-atomic="true">
          <div className={`d-flex align-items-center p-3 rounded-pill text-bg-${alert.type}`}>
                <BsFillCheckCircleFill className='me-2'/> {alert.msg}
          </div>
        </div>}
    </div>
  )
}
