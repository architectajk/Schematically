import React,{useState, useContext} from 'react'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const Hostels = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);
  const [inputValue6, setInputValue6] = useState(0);
  let residentMale = Number(inputValue1);
  let residentFemale = Number(inputValue2);
  let totalResident = residentMale+residentFemale;
  let nonResidentMale = Number(inputValue3);
  let nonResidentFemale = Number(inputValue4);
  let totalNonResident = nonResidentMale+nonResidentFemale;
  let m = Number(inputValue5); // m is number of males
  let f = Number(inputValue6); // f is number of females
  let totalPublic = m+f;

  const calculateFacilityCount = (count, ratio) => Math.round(count / ratio);

  const ResidentMaleWcCount=()=> calculateFacilityCount(residentMale,8)
  const ResidentFemaleWcCount=()=> calculateFacilityCount(residentFemale,6)
  const NonResidentMaleWcCount=()=>{
    let nonResidentMaleWcCount=0;
    if(nonResidentMale>200){nonResidentMaleWcCount=((nonResidentMale-100)*0.025)+4}
    else if(nonResidentMale>=101){nonResidentMaleWcCount=((nonResidentMale-100)*0.03)+4}
    else if(nonResidentMale>=66){nonResidentMaleWcCount=4}
    else if(nonResidentMale>=36){nonResidentMaleWcCount=3}
    else if(nonResidentMale>=16){nonResidentMaleWcCount=2}
    else if(nonResidentMale>0){nonResidentMaleWcCount=1}
    return Math.round(nonResidentMaleWcCount)
  };
  const NonResidentFemaleWcCount=()=>{
    let nonResidentFemaleWcCount=0;
    if (nonResidentFemale>200){nonResidentFemaleWcCount=((nonResidentFemale-100)*0.04)+6}
    else if (nonResidentFemale>=101){nonResidentFemaleWcCount=((nonResidentFemale-100)*0.05)+6}
    else if (nonResidentFemale>=78){nonResidentFemaleWcCount=6}
    else if (nonResidentFemale>=58){nonResidentFemaleWcCount=5}
    else if (nonResidentFemale>=41){nonResidentFemaleWcCount=4}
    else if (nonResidentFemale>=26){nonResidentFemaleWcCount=3}
    else if (nonResidentFemale>=13){nonResidentFemaleWcCount=2}
    else if (nonResidentFemale>0){nonResidentFemaleWcCount=1}
    return Math.round(nonResidentFemaleWcCount)
  };
  const PublicMaleWcCount=()=>{
    let publicMaleWcCount=0;
    if(m>400){publicMaleWcCount=((m-400)*0.004)+4}
    else if(m<100 & m>0){publicMaleWcCount=1}
    else {publicMaleWcCount=m/100}
    return Math.round(publicMaleWcCount)
  };
  const PublicFemaleWcCount=()=>{
    let publicFemaleWcCount=0;
    if(f>200){publicFemaleWcCount=((f-200)*0.01)+4}
    else if (f<=25 & f>0){publicFemaleWcCount=1}
    else {publicFemaleWcCount=f/50}
    return Math.round(publicFemaleWcCount)
  };
  const ResidentUrinalCount=()=> calculateFacilityCount(residentMale,25)
  const NonResidentUrinalCount=()=>{
    let nonResidentUrinalCount=0;
    if (nonResidentMale>200){nonResidentUrinalCount=((nonResidentMale-100)*0.025)+4}
    else if (nonResidentMale>=101){nonResidentUrinalCount=((nonResidentMale-100)*0.03)+4}
    else if (nonResidentMale>=71){nonResidentUrinalCount=4}
    else if (nonResidentMale>=46){nonResidentUrinalCount=3}
    else if (nonResidentMale>=21){nonResidentUrinalCount=2}
    else if(nonResidentMale>=7){nonResidentUrinalCount=1}
    return Math.round(nonResidentUrinalCount)
  };
  const PublicUrinalCount=()=>calculateFacilityCount(m,50)

  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-50 align-middle`}>
          <thead className='align-middle'>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Fixture</th>
              <th scope="col" colSpan="2">Resident</th>
              <th scope="col" colSpan="2">Non-Resident</th>
              <th scope="col" colSpan="2">Visitor/Common Rooms</th>
            </tr>
            <tr>
              <th scope="col" colSpan="2"></th>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
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
              <td>{ResidentMaleWcCount()}</td>
              <td>{ResidentFemaleWcCount()}</td>
              <td>{NonResidentMaleWcCount()}</td>
              <td>{NonResidentFemaleWcCount()}</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan={6}>One in each Water closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Urinals</td>
              <td>{ResidentUrinalCount()}</td>
              <td>-</td>
              <td>{NonResidentUrinalCount()}</td>
              <td>-</td>
              <td>{PublicUrinalCount()}</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Wash Basins</td>
              <td>{ResidentMaleWcCount()}</td>
              <td>{ResidentFemaleWcCount()}</td>
              <td>{NonResidentMaleWcCount()}</td>
              <td>{NonResidentFemaleWcCount()}</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Bath/Showers</td>
              <td>{ResidentMaleWcCount()}</td>
              <td>{ResidentFemaleWcCount()}</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Cleaner's Sink</td>
              <td colSpan="6">1 per each floor</td>
            </tr>           
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Residential (Male)" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Residential (Female)" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of Residents</span>
            <input className="form-control" type="text" value={totalResident} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Non-Residential (Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Non-Residential (Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of Non-Residents</span>
            <input className="form-control" type="text" value={totalNonResident} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Male" value={inputValue5} onChange={setInputValue5}/>
            <NumericInput span="Female" value={inputValue6} onChange={setInputValue6}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of People</span>
            <input className="form-control" type="text" value={totalPublic} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src="../assests/SanReq/12.png" alt="" />
      </div>      
    </div>
  )
}

export default Hostels
