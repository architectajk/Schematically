import React,{useState, useContext} from 'react'
import image from '../../../../assets/SanReq/8.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const HospitalStaff = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0)
  let staffMale = Number(inputValue1); // m is number of males
  let staffFemale = Number(inputValue2); // f is number of females
  let totalStaff = staffMale+staffFemale;
  let nurseMale = Number(inputValue3);
  let nurseFemale=Number(inputValue4);
  let totalNurse=nurseMale + nurseFemale;

  const StaffMaleWcCount=()=>{
    let staffMaleWcCount= staffMale/4;
    return Math.round(staffMaleWcCount)
  };
  const StaffFemaleWcCount=()=>{
    let staffFemaleWcCount= staffFemale/4;
    return Math.round(staffFemaleWcCount)
  };
  const NurseMaleWcCount=()=>{
    let nurseMaleWcCount=0;
    if(nurseMale>35){nurseMaleWcCount=(nurseMale*2)/35}
    else if (nurseMale<=35 & nurseMale>4){return 2}
    else if (nurseMale>0){return 1}
    return Math.round(nurseMaleWcCount)
  };
  const NurseFemaleWcCount=()=>{
    let nurseFemaleWcCount=0;
    if (nurseFemale>25){nurseFemaleWcCount=(nurseFemale*2)/25}
    else if (nurseFemale<=25 & nurseFemale>4){return 2}
    else if (nurseFemale>0){return 1}
    return Math.round(nurseFemaleWcCount)
  };
  const StaffMaleWbCount=()=>{
    let staffMaleWbCount=0
    if (staffMale<8 & staffMale>0){return 1}
    else {staffMaleWbCount = staffMale/8}
    return Math.round(staffMaleWbCount)
  };
  const StaffFemaleWbCount=()=>{
    let staffFemaleWbCount=0;
    if (staffFemale<8 & staffFemale>0){return 1}
    else {staffFemaleWbCount = staffFemale/8}
    return Math.round(staffFemaleWbCount)
  };
  const NurseMaleWbCount=()=>{
    let nurseMaleWbCount=0;
    if (nurseMale<8 & nurseMale>0){return 1}
    else {nurseMaleWbCount = nurseMale/8}
    return Math.round(nurseMaleWbCount)
  };
  const NurseFemaleWbCount=()=>{
    let nurseFemaleWbCount=0;
    if (nurseFemale<8 & nurseFemale>0){return 1}
    else {nurseFemaleWbCount = nurseFemale/8}
    return Math.round(nurseFemaleWbCount)
  };
  const StaffMaleBathCount=()=>{
    let staffMaleBathCount=0
    if (staffMale<8 & staffMale>0){return 1}
    else {staffMaleBathCount = staffMale/4}
    return Math.round(staffMaleBathCount)  
  };
  const StaffFemaleBathCount=()=>{
    let staffFemaleBathCount=0;
    if (staffFemale<8 & staffFemale>0){return 1}
    else {staffFemaleBathCount = staffFemale/4}
    return Math.round(staffFemaleBathCount)   
  };
  const NurseMaleBathCount=()=>{
    let nurseMaleBathCount=0;
    if (nurseMale<8 & nurseMale>0){return 1}
    else {nurseMaleBathCount = nurseMale/6}
    return Math.round(nurseMaleBathCount)
  };
  const NurseFemaleBathCount=()=>{
    let nurseFemaleBathCount=0;
    if (nurseFemale<8 & nurseFemale>0){return 1}
    else {nurseFemaleBathCount = nurseFemale/6}
    return Math.round(nurseFemaleBathCount)
  };
  const StaffDrinkingWater =()=>{
    let staffDrinkingWater=0;
    if(totalStaff<50 & totalStaff>25) {return 1}
    else (staffDrinkingWater=totalStaff/100)
    return Math.round(staffDrinkingWater)
  };
  const NurseDrinkingWater =()=>{
    let nurseDrinkingWater=0;
    if(totalNurse<50 & totalNurse>25){return 1}
    else (nurseDrinkingWater=totalNurse/100)
    return Math.round(nurseDrinkingWater)
  }
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-50 align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Sl No.</th>
              <th scope="col" rowSpan={2}>Fixture</th>
              <th scope="col" colSpan="2">Staff Quaters</th>
              <th scope="col" colSpan="2">Nurses Homes</th>
            </tr>
            <tr>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
            </tr>
          </thead> 
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">1</th>
              <td>Water Closets</td>
              <td>{StaffMaleWcCount()}</td>
              <td>{StaffFemaleWcCount()}</td>
              <td>{NurseMaleWcCount()}</td>
              <td>{NurseFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan={4}>One in each water closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Wash Basins</td>
              <td>{StaffMaleWbCount()}</td>
              <td>{StaffFemaleWbCount()}</td>
              <td>{NurseMaleWbCount()}</td>
              <td>{NurseFemaleWbCount()}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Bath/Showers</td>
              <td>{StaffMaleBathCount()}</td>
              <td>{StaffFemaleBathCount()}</td>
              <td>{NurseMaleBathCount()}</td>
              <td>{NurseFemaleBathCount()}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Drinking Water fountain</td>
              <td colSpan={2}>{StaffDrinkingWater()}</td>
              <td colSpan={2}>{NurseDrinkingWater()}</td>
            </tr>
            <tr>
            <th scope="row">6</th>
              <td>Janitor/Cleaner's Sink</td>
              <td colSpan={2}>1 per Floor</td>
              <td colSpan={2}>1 per Floor</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Staff (Male)" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Staff (Female)" value={inputValue2} onChange={setInputValue2}/>
        </div>
        <div className="container input-group mb-3 w-75">
            <span className="input-group-text">Total Number of Staff</span>
            <input className="form-control" type="text" value={totalStaff} aria-label="readonly input" readonly/>
        </div>
        <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Nurse (Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Nurse (Female)" value={inputValue4} onChange={setInputValue4}/>
        </div>
        <div className="container input-group mb-3 w-75">
            <span className="input-group-text">Total Number of Nurse</span>
            <input className="form-control" type="text" value={totalNurse} aria-label="readonly input" readonly/>
        </div>
      <div className='d-flex justify-content-center'>
        <img src={image} alt="" />
      </div>      
    </div>
  )
}

export default HospitalStaff;
