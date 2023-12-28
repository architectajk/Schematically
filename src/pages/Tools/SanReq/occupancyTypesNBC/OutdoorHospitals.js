import React,{useState, useContext}from 'react';
import image from '../../../../assets/SanReq/6.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const OutdoorHospitals = () => {
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

  const PatientMaleWcCount=()=>{
    let patientMaleWcCount=0;
    if(m<=50 & m>0){return 1}
    else {patientMaleWcCount=m/100}
    return Math.round(patientMaleWcCount)
  };
  const PatientFemaleWcCount=()=>{
    let patientFemaleWcCount=0;
    if(f<=50 & f>0){return 1}
    else {patientFemaleWcCount=f/50}
    return Math.round(patientFemaleWcCount)
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
  const PatientUrinalCount=()=>{
  let patientUrinalCount=0;
  if (m<50 & m>0){patientUrinalCount=1}
  else{patientUrinalCount=m/50}
  return Math.round(patientUrinalCount)
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
  const PatientMaleWbCount=()=>{
    let patientMaleWbCount=0;
    if(m<=50 & m>0){return 1}
    else {patientMaleWbCount=m/50}
    return Math.round(patientMaleWbCount)
  };
  const PatientFemaleWbCount=()=>{
    let patientFemaleWbCount=0;
    if(f<=50 & f>0){return 1}
    else {patientFemaleWbCount=f/50}
    return Math.round(patientFemaleWbCount)
  };
  const StaffMaleWbCount=()=>{
    let staffMaleWbCount=0;
    if(staffMale>=36){staffMaleWbCount=((staffMale-35)*0.04)+2}
    else if(staffMale>=16){staffMaleWbCount=2}
    else if(staffMale>0){staffMaleWbCount=1}
    return Math.round(staffMaleWbCount)
  };
  const StaffFemaleWbCount=()=>{
    let staffFemaleWbCount=0;
    if (staffFemale>=26){staffFemaleWbCount=((staffFemale-25)*0.04)+2}
    else if (staffFemale>=13){staffFemaleWbCount=2}
   else if (staffFemale>0){staffFemaleWbCount=1}
    return Math.round(staffFemaleWbCount)
  };
  const StaffDrinkingWater=()=>{
    let staffDrinkingWater=0;
    if (totalStaff<=50 & totalStaff>0){return 1}
    else {staffDrinkingWater=totalStaff/100}
    return Math.round(staffDrinkingWater)
  };
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-50 align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Sl No.</th>
              <th scope="col" rowSpan={2}>Fixture</th>
              <th scope="col" colSpan="2">Public</th>
              <th scope="col" colSpan="2">Staff</th>
            </tr>
            <tr>
              <th scope="col">Males</th>
              <th scope="col">Females</th>
              <th scope="col">Males</th>
              <th scope="col">Females</th>
            </tr>
          </thead> 
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">1</th>
              <td>Toilet suite comprising one WC and one Washbasin (with optimal shower stall if building used for 24h)</td>
              <td colSpan={2}>Private Rooms with up to 4 patients</td>
              <td colSpan={2}>For individual doctor's/ officer's rooms</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Water Closets</td>
              <td>{PatientMaleWcCount()}</td>
              <td>{PatientFemaleWcCount()}</td>
              <td>{StaffMaleWcCount()}</td>
              <td>{StaffFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ablution Tap</td>
              <td colSpan={4}>One in each water closet</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Urinals</td>
              <td>{PatientUrinalCount()}</td>
              <td>-</td>
              <td>{StaffUrinalCount()}</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Wash Basins</td>
              <td>{PatientMaleWbCount()}</td>
              <td>{PatientFemaleWbCount()}</td>
              <td>{StaffMaleWbCount()}</td>
              <td>{StaffFemaleWbCount()}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Drinking Water fountain</td>
              <td colSpan="2">-</td>
              <td colSpan="2">{StaffDrinkingWater()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-50 ">
            <NumericInput span="Male(Out-Patient)" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Female(Out-Patient)" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="container input-group mb-3 w-50 ">
            <span className="input-group-text">Total Number of Out-Patients</span>
            <input className="form-control" type="text" value={totalPublic} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-50">
            <NumericInput span="Staff(Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Staff(Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="container input-group mb-3 w-50 ">
            <span className="input-group-text">Total Number of Staff</span>
            <input className="form-control" type="text" value={totalStaff} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src={image} alt="" />
      </div>
    </div>
  )
}

export default OutdoorHospitals;