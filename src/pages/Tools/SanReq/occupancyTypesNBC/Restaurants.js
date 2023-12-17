import React,{useState, useContext} from 'react';
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const Restaurants = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  let m = Number(inputValue1); // m is number of males
  let f = Number(inputValue2); // f is number of females
  let totalPublic = m+f;
  let staffMale = Number(inputValue3);
  let staffFemale=Number(inputValue4);
  let totalStaff=staffMale+staffFemale;

  const PublicMaleWcCount=()=>{
    let publicMaleWcCount=0;
    if(m>200){publicMaleWcCount=((m-200)*0.01)+4}
    else if(m<25 & m>0){publicMaleWcCount=1}
    else {publicMaleWcCount=m/50}
    return Math.round(publicMaleWcCount)
  };
  const PublicFemaleWcCount=()=>{
    let publicFemaleWcCount=0;
    if(f>200){publicFemaleWcCount=((f-200)*0.01)+8}
    else if (f<=12.5 & f>0){publicFemaleWcCount=1}
    else {publicFemaleWcCount=f/25}
    return Math.round(publicFemaleWcCount)
  };
  const StaffMaleWcCount=()=>{
    let staffMaleWcCount=0;
    if(staffMale>200){staffMaleWcCount=((staffMale-100)*0.025)+4}
    else if(staffMale>=101){staffMaleWcCount=((staffMale-100)*0.03)+4}
    else if(staffMale>=66){staffMaleWcCount=4}
    else if(staffMale>=36){staffMaleWcCount=3}
    else if(staffMale>=16){staffMaleWcCount=2}
    else if(staffMale>0){staffMaleWcCount=1}
    return Math.round(staffMaleWcCount)
  };
  const StaffFemaleWcCount=()=>{
    let staffFemaleWcCount=0;
    if (staffFemale>200){staffFemaleWcCount=((staffFemale-100)*0.04)+6}
    else if (staffFemale>=101){staffFemaleWcCount=((staffFemale-100)*0.05)+6}
    else if (staffFemale>=78){staffFemaleWcCount=6}
    else if (staffFemale>=58){staffFemaleWcCount=5}
    else if (staffFemale>=41){staffFemaleWcCount=4}
    else if (staffFemale>=26){staffFemaleWcCount=3}
    else if (staffFemale>=13){staffFemaleWcCount=2}
    else if (staffFemale>0){staffFemaleWcCount=1}
    return Math.round(staffFemaleWcCount)
  };
  const PublicUrinalCount=()=>{
  let PublicUrinalCount=0;
  if (m<50 & m>0){PublicUrinalCount=1}
  else{PublicUrinalCount=m/50}
  return Math.round(PublicUrinalCount)
  };
  const StaffUrinalCount=()=>{
  let staffUrinalCount=0;
  if (staffMale>200){staffUrinalCount=((staffMale-100)*0.025)+4}
  else if (staffMale>=101){staffUrinalCount=((staffMale-100)*0.03)+4}
  else if (staffMale>=71){staffUrinalCount=4}
  else if (staffMale>=46){staffUrinalCount=3}
  else if (staffMale>=21){staffUrinalCount=2}
  else if(staffMale>=7){staffUrinalCount=1}
  return Math.round(staffUrinalCount)
  };


  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-75 align-middle`}>
          <thead className='align-middle'>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Fixture</th>
              <th scope="col" colSpan="2">Public Rooms</th>
              <th scope="col" colSpan="2">Non-Residential Staff</th>
            </tr>
            <tr>
              <th scope="col" colSpan="2"></th>
              <th scope="col">Males</th>
              <th scope="col">Females</th>
              <th scope="col">Males</th>
              <th scope="col">Females</th>
            </tr>
          </thead> 
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">1</th>
              <td>Water Closets</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
              <td>{StaffMaleWcCount()}</td>
              <td>{StaffFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan={4}>One in each water closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Urinals</td>
              <td>{PublicUrinalCount()}</td>
              <td>-</td>
              <td>{StaffUrinalCount()}</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Wash Basins</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
              <td>{StaffMaleWcCount()}</td>
              <td>{StaffFemaleWcCount()}</td>
            </tr>            
            <tr>
              <th scope="row">5</th>
              <td>Cleaner's Sink</td>
              <td colSpan="4">1 per Restaurant</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Kitchen Sink/ Dish Washer</td>
              <td colSpan="4">1 per kitchen</td>
            </tr>           
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-50 ">
            <NumericInput span="Male" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Female" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="container input-group mb-3 w-50 ">
            <span className="input-group-text">Total Number of People</span>
            <input className="form-control" type="text" value={totalPublic} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-50 ">
          <NumericInput span="Staff(Male)" value={inputValue3} onChange={setInputValue3}/>
          <NumericInput span="Staff(Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="container input-group mb-3 w-50 ">
          <span className="input-group-text">Total Number of Staff</span>
          <input className="form-control" type="text" value={totalStaff} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src="../assests/SanReq/10.png" alt="" />
      </div>      
    </div>
  )
}

export default Restaurants;
