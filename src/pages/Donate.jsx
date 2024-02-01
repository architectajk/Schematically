import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import { FaCheckCircle } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { GiGoldBar } from "react-icons/gi";

export default function Donate() {

  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
  const listGroupPrimary='list-group-item border border-0 bg-transparent text-light';
  const listGroup='list-group-item border border-0 bg-transparent';

  return (
    <div>
      <h1 className={`${textColorClass} d-flex justify-content-center`}>Donate</h1>
      <p className={`${textColorClass} fs-5 d-flex justify-content-center mb-5`}>Support us with a donation and get your company name advertised:</p>
        <div className="row mb-3 align-items-center" data-bs-theme={mode}>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode}`}>
              <div className="card-body text-center d-flex flex-column">
                <h2 className="card-title"><GiGoldBar color="grey"/> Silver membership</h2>
                <p className="card-text d-flex flex-grow-1 justify-content-center">Get your company name displayed</p>
                <h1 className='card-title text-primary'>₹ 499.00</h1>
                <p className="card-text d-flex flex-grow-1 justify-content-center">PER MONTH</p>
                <Link to="https://rzp.io/i/BfNZoRlBSO" target="_blank" rel="noopener noreferrer">
                  <button type="button" className={`btn btn-${mode==='dark'?'light':'primary'} btn-lg col-4 mx-auto`}>Donate</button>
                </Link> 
                <ul className='list-group my-3'>
                  <li className={listGroup}><FaCheckCircle /> Advertise - Get your company name displayed </li>
                  <li className={listGroup}><FaCheckCircle /> Limited collaborations</li>
                </ul>  
             </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card text-bg-primary bg-gradient card-${mode} h-100`}>
              <div className="card-body text-center  d-flex  flex-column">
                <h2 className="card-title"><GiGoldBar color="yellow" /> Gold membership</h2>
                <p className="card-text d-flex flex-grow-1">Get your company logo displayed and link to website</p>
                <h1 className='card-title'>₹ 999.00</h1>
                <p className="card-text d-flex flex-grow-1 justify-content-center">PER MONTH</p>
                <Link to="https://rzp.io/i/LojlE9DE0" target="_blank" rel="noopener noreferrer">
                  <button type="button" className='btn btn-light btn-lg col-4 mx-auto'>Donate</button>
                </Link> 
                <ul className='list-group my-4'>
                  <li className={listGroupPrimary}><FaCheckCircle /> Advertise - Get your company logo displayed </li>
                  <li className={listGroupPrimary}><FaCheckCircle /> Link to website</li>
                  <li className={listGroupPrimary}><FaCheckCircle /> Feature requests</li>
                  <li className={listGroupPrimary}><FaCheckCircle /> Priority support</li>
                </ul>  
             </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className={`card card-${mode}`}>
              <div className="card-body text-center d-flex flex-column">
                <h2 className="card-title"><IoDiamondSharp color="grey" /> Diamond membership</h2>
                <p className="card-text d-flex flex-grow-1 justify-content-center">Get your company logo displayed and link to website</p>
                <h1 className='card-title text-primary'>₹ 1,999.00</h1>
                <p className="card-text d-flex flex-grow-1 justify-content-center">PER MONTH</p>
                <Link to="https://rzp.io/i/9Yd10G7t" target="_blank" rel="noopener noreferrer">
                  <button type="button" className={`btn btn-${mode==='dark'?'light':'primary'} btn-lg col-4 mx-auto`}>Donate</button>
                </Link>
                <ul className='list-group my-3'>
                  <li className={listGroup}><FaCheckCircle /> Dedicated support</li>
                  <li className={listGroup}><FaCheckCircle /> Unlimited collaborations</li>
                </ul>  
             </div>
            </div>
          </div>
        </div>
    </div>
  )
}
