import React,{ useState, useContext} from 'react'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const CulturalInstitutions = () => {
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
    if(m>400){publicMaleWcCount=((m-400)*0.004)+2}
    else if(m<200 & m>0){publicMaleWcCount=1}
    else {publicMaleWcCount=m/200}
    return Math.round(publicMaleWcCount)
  };
  const PublicFemaleWcCount=()=>{
    let publicFemaleWcCount=0;
    if(f>200){publicFemaleWcCount=((f-200)*0.006)+2}
    else if (f<=100 & f>0){publicFemaleWcCount=1}
    else {publicFemaleWcCount=f*0.01}
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
  const PublicMaleWbCount=()=>{
      let publicMaleWbCount=0;
      if(m>400){publicMaleWbCount=((m-400)*0.004)+2}
      else if(m<200 & m>0){publicMaleWbCount=1}
      else {publicMaleWbCount=m/200}
      return Math.round(publicMaleWbCount)
  };
  const PublicFemaleWbCount=()=>{
      let publicFemaleWbCount=0;
      if(f>200){publicFemaleWbCount=((f-200)*0.006)+2}
      else if (f<=100 & f>0){publicFemaleWbCount=1}
      else {publicFemaleWbCount=f*0.01}
      return Math.round(publicFemaleWbCount)
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
  const DrinkingWater=()=>{
      let drinkingWater, total=totalPublic+totalStaff;
      if (drinkingWater<100 & drinkingWater>0){total=1}
      else {drinkingWater=total/100}
      return Math.round(drinkingWater)
  };    
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-50 align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Sl No.</th>
              <th scope="col"rowSpan={2}>Fixture</th>
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
              <td>Water Closets</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
              <td>{StaffMaleWcCount()}</td>
              <td>{StaffFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td>{PublicMaleWbCount()}</td>
              <td>{PublicFemaleWbCount()}</td>
              <td>{StaffMaleWbCount()}</td>
              <td>{StaffFemaleWbCount()}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Drinking Water fountain</td>
              <td colSpan="4">{DrinkingWater()}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Cleaner's sink</td>
              <td colSpan="4">1 per Floor</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Showers/Bathing </td>
              <td colSpan="4">As per Requirement</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Male" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Female" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of People</span>
            <input className="form-control" type="text" value={totalPublic} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Staff (Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Staff (Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="container input-group mb-4 w-75 ">
            <span className="input-group-text">Total Number of Staff</span>
            <input className="form-control" type="text" value={totalStaff} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src="../assests/SanReq/4.png" alt="" />
      </div>
    </div>
  )
}

export default CulturalInstitutions;