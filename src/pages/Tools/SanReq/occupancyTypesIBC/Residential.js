import React,{useState, useContext} from 'react'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const Residential = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0.5);
  let occupancyLoad = Number(inputValue1); 
  let mratio = Number(inputValue2); // m is ratio of males
  let fratio = 1-mratio; // f is ratio of females
  let male = occupancyLoad*mratio;
  let female = occupancyLoad*fratio;

  return (
    <div>
        <div className='table-responsive'>
        <table className={`table table-sm table-${mode} table-hover table-bordered w-75 align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Description</th>
              <th scope="col" colSpan={2}>Water Closets</th>
              <th scope="col" rowSpan={2}>Urinals</th>
              <th scope="col" colSpan={2}>Lavatories / Wash Basin</th>
              <th scope="col" rowSpan={2}>BathTubs/Showers</th>
              <th scope="col" rowSpan={2}>Drinking Fountain</th>
              <th scope="col" rowSpan={2}>Others</th>
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
              <td>Hotels, motels, boarding houses (transient)</td>
              <td colSpan={2}>1 per sleeping unit</td>
              <td>-</td>
              <td colSpan={2}>1 per sleeping unit</td>
              <td>1 per sleeping unit</td>
              <td>-</td>
              <td>1 service sink</td>
              </tr>
              <tr>
              <td>Dormitories, fraternities,sororities and boarding houses (not transient)</td>
              <td colSpan={2}>{Math.ceil(occupancyLoad/10)}</td>
              <td>-</td>
              <td colSpan={2}>{Math.ceil(occupancyLoad/10)}</td>
              <td>{Math.ceil(occupancyLoad/8)}</td>
              <td>{Math.ceil(occupancyLoad/100)}</td>
              <td>1 service sink</td>
              </tr>
              <tr>
              <td>Apartment house </td>
              <td colSpan={2}>1 per dwelling unit</td>
              <td>-</td>
              <td colSpan={2}>1 per dwelling unit</td>
              <td>1 per dwelling unit</td>
              <td>-</td>
              <td>1 kitchen sink per dwelling unit; 1 automatic clothes washer connection per 20 dwelling units</td>
              </tr>
              <tr>
              <td>Congregate living facilities with 16 or fewer persons</td>
              <td colSpan={2}>{Math.ceil(occupancyLoad/10)}</td>
              <td>-</td>
              <td colSpan={2}>{Math.ceil(occupancyLoad/10)}</td>
              <td>{Math.ceil(occupancyLoad/8)}</td>
              <td>{Math.ceil(occupancyLoad/100)}</td>
              <td>1 service sink</td>
              </tr>
              <tr>
              <td>One - and two-family dwellings and lodging houses with five or fewer guestrooms</td>
              <td colSpan={2}>1 per dwelling unit</td>
              <td>-</td>
              <td colSpan={2}>1 per dwelling unit</td>
              <td>1 per dwelling unit</td>
              <td>-</td>
              <td>1 kitchen sink per dwelling unit; 1 automatic clothes washer connection per dwelling unit</td>
              </tr>
          </tbody>
        </table>
      </div>
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
  )
}

export default Residential;