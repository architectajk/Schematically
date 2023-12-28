import React,{useState,useContext} from 'react';
import image from '../../../../assets/SanReq/7.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const AdminHospitals = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  let staffMale = Number(inputValue1);
  let staffFemale=Number(inputValue2);
  let totalStaff=staffMale+staffFemale;

  const StaffMaleWcCount=()=>{
    let staffMaleWcCount=0;
    if(staffMale<25 & staffMale>0){return 1}
    else {staffMaleWcCount=staffMale/25}
    return Math.round(staffMaleWcCount)
  };
  const StaffFemaleWcCount=()=>{
    let staffFemaleWcCount=0;
    if(staffFemale<15 & staffFemale>0){return 1}
    else {staffFemaleWcCount=staffFemale/15}
    return Math.round(staffFemaleWcCount)
  };
  const StaffUrinalCount=()=>{
    let staffUrinalCount=0;
    if (staffMale>200){staffUrinalCount=((staffMale-100)*0.025)+4}
    else if (staffMale>=101){staffUrinalCount=((staffMale-100)*0.03)+4}
    else if (staffMale>=71){staffUrinalCount=4}
    else if (staffMale>=51){staffUrinalCount=3}
    else if (staffMale>=16){staffUrinalCount=2}
    else if(staffMale>=6){staffUrinalCount=1}
    return Math.round(staffUrinalCount)
  };
  const StaffMaleWbCount=()=>{
    let staffMaleWbCount=0;
    if(staffMale<25 & staffMale>0){return 1}
    else {staffMaleWbCount=staffMale/25}
    return Math.round(staffMaleWbCount)
  };
  const StaffFemaleWbCount=()=>{
    let staffFemaleWbCount=0;
    if(staffFemale<25 & staffFemale>0){return 1}
    else {staffFemaleWbCount=staffFemale/25}
    return Math.round(staffFemaleWbCount)
  }
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
              <th scope="col" colSpan="2">Staff Toilets</th>
            </tr>
            <tr>
              <th scope="col">Males</th>
              <th scope="col">Females</th>
            </tr>
          </thead> 
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">1</th>
              <td>Toilet suite comprising one WC and one Washbasin (with optimal shower stall if building used for 24h)</td>
              <td colSpan={2}>For indiviual doctor's/ officer's rooms</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Water Closets</td>
              <td>{StaffMaleWcCount()}</td>
              <td>{StaffFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ablution Tap</td>
              <td colSpan={2}>One in each water closet</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Urinals</td>
              <td>{StaffUrinalCount()}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Wash Basins</td>
              <td>{StaffMaleWbCount()}</td>
              <td>{StaffFemaleWbCount()}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Drinking Water fountain</td>
              <td colSpan="2">{StaffDrinkingWater()}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Cleaner's Sink</td>
              <td colSpan="4">1 per Floor</td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Kitchen Sink</td>
              <td colSpan="4">1 per Floor</td>
            </tr>           
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-50 ">
            <NumericInput span="Male" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Female" value={inputValue2} onChange={setInputValue2}/>
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

export default AdminHospitals;