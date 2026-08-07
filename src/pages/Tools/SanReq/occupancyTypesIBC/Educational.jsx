import React,{useState, useContext} from 'react'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const Educational = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0.5);
  let occupancyLoad = Number(inputValue1); 
  let mratio = Number(inputValue2); // m is ratio of males
  let fratio = 1-mratio; // f is ratio of females
  let male = occupancyLoad*mratio;
  let female = occupancyLoad*fratio;
  const calculateCount = (count, threshold, rate, base, adder) => {
    if (count > threshold) {
      return Math.ceil((count - threshold) * rate + adder);
    } else {
      return Math.ceil(count / base);
    }
  };
  const MaleWcCount = calculateCount(male,0,0.02,1,0)
  const FemaleWcCount = calculateCount(female,0,0.02,1,0)
  const UrinalCount = Math.floor(MaleWcCount*0.67);
  const MaleWbCount = calculateCount(male,0,0.02,1,0)
  const FemaleWbCount = calculateCount(female,0,0.02,1,0)
  const DrinkingWater = calculateCount(occupancyLoad,0,0.01,1,0)

  return (
    <>
        <div className='table-responsive'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Description</th>
              <th scope="col" colSpan={2}>Water Closets</th>
              <th scope="col" rowSpan={2}>Urinals</th>
              <th scope="col" colSpan={2}>Lavatories / Wash Basin</th>
              <th scope="col" rowSpan={2}>Showers</th>
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
              <td>Educational facilities</td>
              <td>{MaleWcCount}</td>
              <td>{FemaleWcCount}</td>
              <td>{UrinalCount}</td>
              <td>{MaleWbCount}</td>
              <td>{FemaleWbCount}</td>
              <td>-</td>
              <td>{DrinkingWater}</td>
              <td>1 service sink</td>
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
    </>       
  )
}

export default Educational;