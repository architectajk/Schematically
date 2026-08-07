import React,{useState, useContext} from 'react'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const Institutional = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0.5);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);

  let occupancyLoad = Number(inputValue1); 
  let mratio = Number(inputValue2); // m is ratio of males
  let fratio = 1-mratio; // f is ratio of females
  let male = occupancyLoad*mratio;
  let female = occupancyLoad*fratio;
  let rooms= Number(inputValue3)
  let prisonMale = Number(inputValue4) 
  let prisonFemale = Number(inputValue5) 
  let prisonTotal = prisonMale + prisonFemale;

  const calculateCount = (count, threshold, rate, base, adder) => {
    if (count > threshold) {
      return Math.ceil((count - threshold) * rate + adder);
    } else {
      return Math.ceil(count / base);
    }
  };

  const CustodialMaleWcCount = calculateCount(male,0,0.1,1,0)
  const CustodialFemaleWcCount = calculateCount(female,0,0.1,1,0)
  const CustodialUrinalCount = Math.floor(CustodialMaleWcCount*0.67);
  const CustodialMaleWbCount = calculateCount(male,0,0.1,1,0)
  const CustodialFemaleWbCount = calculateCount(female,0,0.1,1,0)
  const CustodialBathCount = calculateCount(female,0,0.125,1,0)
  const CustodialDrinkingWater = calculateCount(occupancyLoad,0,0.01,1,0)
  const MedicalRooms = calculateCount(rooms,0,1,1,0)
  const MedicalBathCount = calculateCount(occupancyLoad,0,0.067,1,0)
  const MedicalDrinkingWater = calculateCount(occupancyLoad,0,0.01,1,0)
  return (
    <div>
        <div className='table-responsive'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Description</th>
              <th scope="col" colSpan={2}>Water Closets</th>
              <th scope="col" rowSpan={2}>Urinals</th>
              <th scope="col" colSpan={2}>Wash Basin</th>
              <th scope="col" rowSpan={2}>Showers</th>
              <th scope="col" rowSpan={2}>Drinking Fountain</th>
            </tr>
            <tr>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
              <th scope='col'>Male</th>
              <th scope='col'>Female</th>
            </tr>
          </thead> 
          <tbody className='table-group-divider'>
          <tr>
              <td>Custodial care facilities</td>
              <td>{CustodialMaleWcCount}</td>
              <td>{CustodialFemaleWcCount}</td>
              <td>{CustodialUrinalCount}</td>
              <td>{CustodialMaleWbCount}</td>
              <td>{CustodialFemaleWbCount}</td>
              <td>{CustodialBathCount}</td>
              <td>{CustodialDrinkingWater}</td>
              </tr>
              <tr>
              <td>Medical care recipients in hospitals and nursing homes</td>
              <td colSpan={2}>{MedicalRooms} Rooms</td>
              <td>-</td>
              <td colSpan={2}>{MedicalRooms} Rooms</td>
              <td>{MedicalBathCount}</td>
              <td>{MedicalDrinkingWater}</td>
              </tr>
              <tr>
              <td>Employees in hospitals and nursing homes </td>
              <td>{Math.ceil(male/25)}</td>
              <td>{Math.ceil(female/25)}</td>
              <td>-</td>
              <td>{Math.ceil(male/35)}</td>
              <td>{Math.ceil(female/35)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/100)}</td>
              </tr>
              <tr>
              <td>Visitors in hospitals and nursing homes</td>
              <td>{Math.ceil(male/75)}</td>
              <td>{Math.ceil(female/75)}</td>
              <td>{Math.floor((Math.ceil(male/75))*0.67)}</td>
              <td>{Math.ceil(male/100)}</td>
              <td>{Math.ceil(female/100)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/500)}</td>
              </tr>
              <tr>
              <td>Prisons</td>
              <td>{prisonMale}</td>
              <td>{prisonFemale}</td>
              <td>-</td>
              <td>{prisonMale}</td>
              <td>{prisonFemale}</td>
              <td>{Math.ceil(prisonTotal/15)}</td>
              <td>{Math.ceil(prisonTotal/100)}</td>
              </tr>
              <tr>
              <td>Reformitories, detention centers, and correctional centers</td>
              <td>{Math.ceil(male/15)}</td>
              <td>{Math.ceil(female/15)}</td>
              <td>{Math.ceil((Math.ceil(male/15))*0.67)}</td>
              <td>{Math.ceil(male/15)}</td>
              <td>{Math.ceil(female/15)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/100)}</td>
              </tr>
              <tr>
              <td>Employees in reformatories, detention centers and correctional centers</td>
              <td>{Math.ceil(male/25)}</td>
              <td>{Math.ceil(female/25)}</td>
              <td>-</td>
              <td>{Math.ceil(male/35)}</td>
              <td>{Math.ceil(female/35)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/100)}</td>
              </tr>
              <tr>
              <td>Adult day care and child day care</td>
              <td>{Math.ceil(male/15)}</td>
              <td>{Math.ceil(female/15)}</td>
              <td>-</td>
              <td>{Math.ceil(male/15)}</td>
              <td>{Math.ceil(female/15)}</td>
              <td>1</td>
              <td>{Math.ceil(occupancyLoad/100)}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="input-group mb-3">
            <NumericInput span="Occupancy Load" value={inputValue1} onChange={setInputValue1}/>
          </div>
          <div className="input-group mb-3">
            <NumericInput span="Male Ratio" value={inputValue2} onChange={setInputValue2}/>
            <span className="input-group-text">Male</span>
            <input className="form-control" type="text" value={Math.ceil(male)} aria-label="readonly input" readonly/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Female Ratio</span>
            <input className="form-control" type="text" value={fratio} aria-label="readonly input" readonly/>
            <span className="input-group-text">Female</span>
            <input className="form-control" type="text" value={Math.floor(female)} aria-label="readonly input" readonly/>
          </div>
          </div>
      <div className="col-6">
          <div className="input-group mb-3">
            <NumericInput span="Number of Rooms" value={inputValue3} onChange={setInputValue3}/>
          </div>
          <div className="input-group mb-3">
            <NumericInput span="No. of cells (M)" value={inputValue4} onChange={setInputValue4}/>
            <NumericInput span="No. of cells (F)" value={inputValue5} onChange={setInputValue5}/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Total Number of Cells</span>
            <input className="form-control" type="text" value={prisonTotal} aria-label="readonly input" readonly/>
          </div>
      </div>
      </div>
    </div>       
  )
}

export default Institutional;