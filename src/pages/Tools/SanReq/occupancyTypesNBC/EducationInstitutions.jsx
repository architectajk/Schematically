import React,{ useState, useContext} from 'react'
import image from '../../../../assets/SanReq/11.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const EducationInstitutions = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);
  let nursery = Number(inputValue1); 
  let nrboys = Number(inputValue2);
  let nrgirls = Number(inputValue3); 
  let rboys= Number(inputValue4); //  is number of females
  let rgirls= Number(inputValue5);
  let totalNonResidential=nrboys+nrgirls;
  let totalResidential=rboys+rgirls;

  const calculateFacilityCount = (count, ratio) => Math.round(count / ratio);

  const NurseryWcCount = () => calculateFacilityCount(nursery, 15);
  const NonResidentialBoysWcCount = () => calculateFacilityCount(nrboys, 40);
  const NonResidentialGirlsWcCount = () => calculateFacilityCount(nrgirls, 25);
  const ResidentialBoysWcCount = () => calculateFacilityCount(rboys, 8);
  const ResidentialFemaleWcCount = () => calculateFacilityCount(rgirls, 6);
  const NonResidentialUrinalCount = () => calculateFacilityCount(nrboys, 20);
  const ResidentialUrinalCount = () => calculateFacilityCount(rboys, 25);
  const NonResidentialBoysWbCount = () => calculateFacilityCount(nrboys, 60);
  const NonResidentialGirlsWbCount = () => calculateFacilityCount(nrgirls, 40);
  const NurseryBathCount = () => calculateFacilityCount(nursery, 40);
  const NurseryDrinkingWater=()=> calculateFacilityCount(nursery,50)
  const NonResidentialBoysDrinkingWater=()=> calculateFacilityCount(nrboys,50)
  const NonResidentialGirlsDrinkingWater=()=> calculateFacilityCount(nrgirls, 50);
  const ResidentialBoyDrinkingWater = () => calculateFacilityCount(rboys, 50);
  const ResidentialGirlsDrinkingWater = () => calculateFacilityCount(rgirls, 50);
  
  return (
    <>
        <div className='table-responsive'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Fixture</th>
              <th scope="col">Nursery School</th>
              <th scope="col" colSpan="2">Non-Residential</th>
              <th scope="col" colSpan="2">Residential</th>
            </tr>
            <tr>
              <th scope="col" colSpan="2"></th>
              <th scope="col"></th>
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
              <td>{NurseryWcCount()}</td>
              <td>{NonResidentialBoysWcCount()}</td>
              <td>{NonResidentialGirlsWcCount()}</td>
              <td>{ResidentialBoysWcCount()}</td>
              <td>{ResidentialFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan={5}>One in each Water closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Urinals</td>
              <td>-</td>
              <td>{NonResidentialUrinalCount()}</td>
              <td>-</td>
              <td>{ResidentialUrinalCount()}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Wash Basins</td>
              <td>{NurseryWcCount()}</td>
              <td>{NonResidentialBoysWbCount()}</td>
              <td>{NonResidentialGirlsWbCount()}</td>
              <td>{ResidentialBoysWcCount()}</td>
              <td>{ResidentialFemaleWcCount()}</td>
            </tr>            
            <tr>
              <th scope="row">5</th>
              <td>Bath/Showers</td>
              <td>{NurseryBathCount()}</td>
              <td>-</td>
              <td>-</td>
              <td>{ResidentialBoysWcCount()}</td>
              <td>{ResidentialFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Drinking Water fountain</td>
              <td>{NurseryDrinkingWater()}</td>
              <td>{NonResidentialBoysDrinkingWater()}</td>
              <td>{NonResidentialGirlsDrinkingWater()}</td>
              <td>{ResidentialBoyDrinkingWater()}</td>
              <td>{ResidentialGirlsDrinkingWater()}</td>
            </tr>  
            <tr>
              <th scope="row">7</th>
              <td>Cleaner's Sink</td>
              <td colSpan="5">1 on each floor</td>
            </tr>       
          </tbody>
        </table>
      </div>
      <div className="input-group mb-3">
            <NumericInput span="Nursery" value={inputValue1} onChange={setInputValue1}/>
      </div>
      <div className="input-group mb-3">
            <NumericInput span="Non-Residential (Boys)" value={inputValue2} onChange={setInputValue2}/>
            <NumericInput span="Non-Residential (Girls)" value={inputValue3} onChange={setInputValue3}/>
      </div>
      <div className="input-group mb-3">
            <span className="input-group-text">Total Number of Non-Residential</span>
            <input className="form-control" type="text" value={totalNonResidential} aria-label="readonly input" readonly/>
      </div>
      <div className="input-group mb-3">
            <NumericInput span="Residential (Boys)" value={inputValue4} onChange={setInputValue4}/>
            <NumericInput span="Residential (Girls)" value={inputValue5} onChange={setInputValue5}/>
      </div>
      <div className="input-group mb-3">
            <span className="input-group-text">Total Number of Residential</span>
            <input className="form-control" type="text" value={totalResidential} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src={image} className="img-fluid" alt="" />
      </div>       
    </>
  )
}

export default EducationInstitutions;
