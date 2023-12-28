import React,{useState, useContext} from 'react';
import image from '../../../../assets/SanReq/14.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const TransportHubs = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);
  const [inputValue6, setInputValue6] = useState(0);
  let intermediateMale = Number(inputValue1); // m is number of males
  let intermediateFemale = Number(inputValue2); // f is number of females
  let totalIntermediate = intermediateMale + intermediateFemale;
  let terminalMale = Number(inputValue3);
  let terminalFemale = Number(inputValue4);
  let totalTerminal = terminalMale + terminalFemale;
  let airportMale = Number(inputValue5);
  let airportFemale = Number(inputValue6);
  let totalAirport = airportMale + airportFemale;

  const IntermediateMaleWcCount = ()=>{
    let intermediateMaleWcCount=0;
    if(intermediateMale>1000){intermediateMaleWcCount=((intermediateMale-1000)/1000)+3}
    else {intermediateMaleWcCount=intermediateMale*0.003}
    return Math.round(intermediateMaleWcCount)
  };
  const IntermediateFemaleWcCount = ()=>{
    let intermediateFemaleWcCount=0;
    if (intermediateFemale>1000){intermediateFemaleWcCount=((intermediateFemale-1000)/1000)+4}
    else {intermediateFemaleWcCount=intermediateFemale*0.004}
    return Math.round(intermediateFemaleWcCount)
  };
  const TerminalMaleWcCount=()=>{
    let terminalMaleWcCount=0;
    if(terminalMale>1000){terminalMaleWcCount=((terminalMale-1000)/1000)+4}
    else {terminalMaleWcCount=terminalMale*0.004}
    return Math.round(terminalMaleWcCount)
  };
  const TerminalFemaleWcCount=()=>{
    let terminalFemaleWcCount=0;
    if(terminalFemale>1000){terminalFemaleWcCount=((terminalFemale-1000)/1000)+5}
    else {terminalFemaleWcCount=terminalFemale*0.005}
    return Math.round(terminalFemaleWcCount)
  };
  const AirportMaleWcCount=()=>{
    let airportMaleWcCount=0;
    if (airportMale>=1000){airportMaleWcCount=18}
    else if(airportMale>=800){airportMaleWcCount=16}
    else if(airportMale>=600){airportMaleWcCount=12}
    else if(airportMale>=400){airportMaleWcCount=9}
    else if(airportMale>=200){airportMaleWcCount=5}
    else if(airportMale>0){airportMaleWcCount=2}
    return airportMaleWcCount;
  };
  const AirportFemaleWcCount=()=>{
    let airportFemaleWcCount=0;
    if (airportFemale>=1000){airportFemaleWcCount=29}
    else if (airportFemale>=800){airportFemaleWcCount=26}
    else if (airportFemale>=600){airportFemaleWcCount=20}
    else if (airportFemale>=400){airportFemaleWcCount=15}
    else if (airportFemale>=200){airportFemaleWcCount=8}
    else if (airportFemale>0){airportFemaleWcCount=2}
    return airportFemaleWcCount;
  };
  const IntermediateUrinalCount = ()=>{
    let intermediateUrinalCount=0;
    if(intermediateMale>1000){intermediateUrinalCount=((intermediateMale-1000)/1000)+4}
    else {intermediateUrinalCount=intermediateMale*0.004}
    return Math.round(intermediateUrinalCount)
  };
  const TerminalUrinalCount = ()=>{
    let terminalUrinalCount=0;
    if(terminalMale>1000){terminalUrinalCount=((terminalMale-1000)/1000)+6}
    else {terminalUrinalCount=terminalMale*0.006}
    return Math.round(terminalUrinalCount)
  };
  const AirportUrinalCount = ()=>{
    let airportUrinalCount=airportMale/40;
    return Math.round(airportUrinalCount)
  };
  const IntermediateDrinkingWaterCount=()=>{
    let intermediateDrinkingWaterCount = totalIntermediate*0.002;
    return Math.round(intermediateDrinkingWaterCount)
  };
  const TermainalDrinkingWaterCount=()=>{
    let terminalDrinkingWaterCount=totalTerminal*0.003;
    return Math.round(terminalDrinkingWaterCount)
  };
  const AirportDrinkingWaterCount=()=>{
    let airportDrinkingWaterCount=totalAirport*0.004;
    return Math.round(airportDrinkingWaterCount)
  };
  const IntermediateMaleBathCount = ()=>{
    let intermediateMaleBathCount=intermediateMale*0.002;
    return Math.round(intermediateMaleBathCount)
  };
  const IntermediateFemaleBathCount = ()=>{
    let intermediateFemaleBathCount=intermediateFemale*0.002
    return Math.round(intermediateFemaleBathCount)
  };
  const TerminalMaleBathCount=()=>{
    let terminalMaleBathCount=terminalMale*0.003;
    return Math.round(terminalMaleBathCount)
  };
  const TerminalFemaleBathCount=()=>{
    let terminalFemaleBathCount=terminalFemale*0.003;
    return Math.round(terminalFemaleBathCount)
  };
  const AirportMaleBathCount=()=>{
    let airportMaleBathCount=airportMale*0.004;
    return Math.round(airportMaleBathCount)
  };
  const AirportFemaleBathCount=()=>{
    let airportFemaleBathCount=airportFemale*0.004;
    return Math.round(airportFemaleBathCount)
  };
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-75 align-middle`}>
          <thead className='align-middle'>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Fixture</th>
              <th scope="col" colSpan="2">Junction/Intermediate/Bus Station</th>
              <th scope="col" colSpan="2">Terminal Railway and Bus Station</th>
              <th scope="col" colSpan="2">Domestic/International Airport</th>
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
              <td>{IntermediateMaleWcCount()}</td>
              <td>{IntermediateFemaleWcCount()}</td>
              <td>{TerminalMaleWcCount()}</td>
              <td>{TerminalFemaleWcCount()}</td>
              <td>{AirportMaleWcCount()}</td>
              <td>{AirportFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan={6}>One on each water closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Urinals</td>
              <td>{IntermediateUrinalCount()}</td>
              <td>-</td>
              <td>{TerminalUrinalCount()}</td>
              <td>-</td>
              <td>{AirportUrinalCount()}</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Wash Basins</td>
              <td>{IntermediateMaleWcCount()}</td>
              <td>{IntermediateFemaleWcCount()}</td>
              <td>{TerminalMaleWcCount()}</td>
              <td>{TerminalFemaleWcCount()}</td>
              <td>{AirportMaleWcCount()}</td>
              <td>{AirportFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Bath/Showers</td>
              <td>{IntermediateMaleBathCount()}</td>
              <td>{IntermediateFemaleBathCount()}</td>
              <td>{TerminalMaleBathCount()}</td>
              <td>{TerminalFemaleBathCount()}</td>
              <td>{AirportMaleBathCount()}</td>
              <td>{AirportFemaleBathCount()}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Drinking Water Fountain</td>
              <td colSpan={2}>{IntermediateDrinkingWaterCount()}</td>
              <td colSpan={2}>{TermainalDrinkingWaterCount()}</td>
              <td colSpan={2}>{AirportDrinkingWaterCount()}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Cleaner's Sink</td>
              <td colSpan={6}>1 per Toilet compartment with 3 WCs</td>
            </tr>                                  
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Intermediate (Male)" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Intermediate (Female)" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of ShopOwners</span>
            <input className="form-control" type="text" value={totalIntermediate} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Terminal (Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Terminal (Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of personnel</span>
            <input className="form-control" type="text" value={totalTerminal} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Airport (Male)" value={inputValue5} onChange={setInputValue5}/>
            <NumericInput span="Airport (Female)" value={inputValue6} onChange={setInputValue6}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of People</span>
            <input className="form-control" type="text" value={totalAirport} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src={image} alt="" />
      </div>     
    </div>
  )
}

export default TransportHubs;
