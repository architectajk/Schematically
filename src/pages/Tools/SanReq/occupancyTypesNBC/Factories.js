import React,{ useState, useContext} from 'react'
import image from '../../../../assets/SanReq/2.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; 

const Factories=(props)=> {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);
  let officeVisitorMale = Number(inputValue1);
  let officeVisitorFemale = Number(inputValue2); 
  let workerMale = Number(inputValue3);
  let workerFemale = Number(inputValue4);

  const TotalOfficeVisitors=()=>{
    let total=officeVisitorMale+officeVisitorFemale;
    if(isNaN(total)){total="Male+Female";}
    return total;
  };
  const TotalWorkers=()=>{
    let total=workerMale+workerFemale;
    if(isNaN(total)){total="Male+Female";}
    return total;
  };
  const OfficeVisitorMaleWcCount=()=>{
    let officeVisitorMaleWcCount;
    if(officeVisitorMale>200){officeVisitorMaleWcCount=((officeVisitorMale-100)*0.025)+4}
    else if(officeVisitorMale>=101){officeVisitorMaleWcCount=((officeVisitorMale-100)*0.03)+4}
    else if(officeVisitorMale>=66){return 4}
    else if(officeVisitorMale>=36){return 3}
    else if(officeVisitorMale>=26){return 2}
    else if(officeVisitorMale>0){return 1}
    else {return 0}
    return Math.round(officeVisitorMaleWcCount);
  };
  const WorkerMaleWcCount=()=>{
    let workerMaleWcCount;
    if(workerMale>200){workerMaleWcCount=((workerMale-100)*0.025)+4}
    else if(workerMale>=101){workerMaleWcCount=((workerMale-100)*0.03)+4}
    else if(workerMale>=66){workerMaleWcCount=4}
    else if(workerMale>=36){workerMaleWcCount=3}
    else if(workerMale>=16){workerMaleWcCount=2}
    else if(workerMale>0){workerMaleWcCount=1}
    else {workerMaleWcCount=0}
    return Math.round(workerMaleWcCount);
  };
  const OfficeVisitorFemaleWcCount=()=>{
    let officeVisitorFemaleWcCount;
    if (officeVisitorFemale>200){officeVisitorFemaleWcCount=((officeVisitorFemale-100)*0.04)+6}
    else if (officeVisitorFemale>=101){officeVisitorFemaleWcCount=((officeVisitorFemale-100)*0.05)+6}
    else if (officeVisitorFemale>=78){officeVisitorFemaleWcCount=6}
    else if (officeVisitorFemale>=58){officeVisitorFemaleWcCount=5}
    else if (officeVisitorFemale>=41){officeVisitorFemaleWcCount=4}
    else if (officeVisitorFemale>=26){officeVisitorFemaleWcCount=3}
    else if (officeVisitorFemale>=16){officeVisitorFemaleWcCount=2}
    else if (officeVisitorFemale>0){officeVisitorFemaleWcCount=1}
    else {return 0}
    return Math.round(officeVisitorFemaleWcCount);
  };
  const WorkerFemaleWcCount=()=>{
    let workerFemaleWcCount;
    if (workerFemale>200){workerFemaleWcCount=((workerFemale-100)*0.04)+6}
    else if (workerFemale>=101){workerFemaleWcCount=((workerFemale-100)*0.05)+6}
    else if (workerFemale>=78){workerFemaleWcCount=6}
    else if (workerFemale>=58){workerFemaleWcCount=5}
    else if (workerFemale>=41){workerFemaleWcCount=4}
    else if (workerFemale>=26){workerFemaleWcCount=3}
    else if (workerFemale>=13){workerFemaleWcCount=2}
    else if (workerFemale>0){workerFemaleWcCount=1}
    else {return 0}
    return Math.round(workerFemaleWcCount);
  };
  const OfficeVisitorUrinalCount=()=>{
    let officeVisitorUrinalCount;
    if (officeVisitorMale>200){officeVisitorUrinalCount=((officeVisitorMale-100)*0.025)+4}
    else if (officeVisitorMale>=101){officeVisitorUrinalCount=((officeVisitorMale-100)*0.03)+4}
    else if (officeVisitorMale>=71){officeVisitorUrinalCount=4}
    else if (officeVisitorMale>=46){officeVisitorUrinalCount=3}
    else if (officeVisitorMale>=21){officeVisitorUrinalCount=2}
    else if (officeVisitorMale>=7){officeVisitorUrinalCount=1}
    else {return 0}
    return Math.round(officeVisitorUrinalCount);
  };
  const WorkerUrinalCount=()=>{
    let workerUrinalCount;
    if (workerMale>200){workerUrinalCount=((workerMale-100)*0.025)+4}
    else if (workerMale>=101){workerUrinalCount=((workerMale-100)*0.03)+4}
    else if (workerMale>=71){workerUrinalCount=4}
    else if (workerMale>=46){workerUrinalCount=3}
    else if (workerMale>=21){workerUrinalCount=2}
    else if (workerMale>=7){workerUrinalCount=1}
    else {return 0}
    return Math.round(workerUrinalCount);
  };
  const OfficeVisitorMaleWbCount=()=>{
    let officeVisitorMaleWbCount=officeVisitorMale/25;
    if(isNaN(officeVisitorMale)){return 0}
    return Math.round(officeVisitorMaleWbCount);
  };
  const OfficeVisitorFemaleWbCount=()=>{
    let officeVisitorFemaleWbCount=officeVisitorFemale/25;
    if(isNaN(officeVisitorFemale)){return 0}
    return Math.round(officeVisitorFemaleWbCount);
  };
  const WorkerMaleWbCount=()=>{
    let workerMaleWbCount=workerMale/25;
    if(isNaN(officeVisitorFemale)){return 0}
    return Math.round(workerMaleWbCount);
  };
  const WorkerFemaleWbCount=()=>{
    let workerFemaleWbCount=workerFemale/25;
    if(isNaN(workerFemale)){return 0}
    return Math.round(workerFemaleWbCount);
  };
  const Emergency=()=>{
    let emergency, total=workerMale+workerFemale;
    if(isNaN(total)){return 0}
    if(total<500 & total>0){return 1}
    emergency = total/500;
    return Math.round(emergency);
  }
  return (
  <div>
      <div className='d-flex'>
        <table className={`table table-${mode} table-hover table-bordered w-75 align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col"rowSpan={2}>Sl No.</th>
              <th scope="col" rowSpan={2}>Fixture</th>
              <th scope="col" colSpan="2">Offices/Visitors</th>
              <th scope="col" colSpan="2">Workers</th>
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
              <td>{OfficeVisitorMaleWcCount()}</td>
              <td>{OfficeVisitorFemaleWcCount()}</td>
              <td>{WorkerMaleWcCount()}</td>
              <td>{WorkerFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan="4">1 in each Water Closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Urinals</td>
              <td>{OfficeVisitorUrinalCount()}</td>
              <td>-</td>
              <td>{WorkerUrinalCount()}</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Wash Basins/Wash Basins in rows or troughs and taps spaced 750mm c/c</td>
              <td>{OfficeVisitorMaleWbCount()}</td>
              <td>{OfficeVisitorFemaleWbCount()}</td>
              <td>{WorkerMaleWbCount()}</td>
              <td>{WorkerFemaleWbCount()}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Drinking Water fountain</td>
              <td colSpan="4">{inputValue5} (1 on each floor)</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Cleaner's sink</td>
              <td colSpan="4"> {inputValue5} (1 on each floor)</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Showers/Bathing </td>
              <td colSpan="4">As per Requirement</td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Emergency shower and Eye wash fountain</td>
              <td colSpan="2">-</td>
              <td colSpan="2">{Emergency()} (1 per every Shop floor)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="input-group mb-3 w-75 ">
            <NumericInput span="Office / Visitor (Male)" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Office / Visitor (Female)" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="input-group mb-4 w-75 ">
            <span className="input-group-text">Total Number of Office Staff / Visitors</span>
            <input className="form-control" type="text" value={TotalOfficeVisitors()} aria-label="readonly input" readOnly/>
      </div>
      <div className="input-group mb-3 w-75 ">
            <NumericInput span="Workers (Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Workers (Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="input-group mb-4 w-75 ">
            <span className="input-group-text">Total Number of Office Staff / Visitors</span>
            <input className="form-control" type="text" value={TotalWorkers()} aria-label="readonly input" readOnly/>
      </div>
      <div className="input-group mb-3 w-75">
            <NumericInput span="Number of floor in a Building" value={inputValue5} onChange={setInputValue5}/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src={image} alt="" />
      </div>
  </div>
  );
};

export default Factories;