import React,{useState, useContext} from 'react'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const Assembly = () => {
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
  const CasinoMaleWcCount = calculateCount(male,400,0.004,100,4)
  const CasinoFemaleWcCount = calculateCount(female,400,0.0067,50,8)
  const CasinoMaleWbCount = calculateCount(male,750,0.002,250,3)
  const CasinoFemaleWbCount = calculateCount(female,750,0.002,250,3)
  const SportMaleWcCount = calculateCount(male, 1500, 0.0083, 75,20);
  const SportFemaleWcCount = calculateCount(female, 1520, 0.0167, 40,20);

  return (
    <>
        <div className='table-responsive small'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col" rowSpan={2}>Description</th>
              <th scope="col" colSpan={2}>Water Closets</th>
              <th scope="col" rowSpan={2}>Urinals</th>
              <th scope="col" colSpan={2}>Lavatories / Wash Basin</th>
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
              <td>Theaters and other buildings for the performing arts and motion pictures</td>
              <td>{Math.ceil(male/125)}</td>
              <td>{Math.ceil(female/65)}</td>
              <td>{Math.floor((Math.ceil(male/125))*0.67)}</td>
              <td>{Math.ceil(male/200)}</td>
              <td>{Math.ceil(female/200)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/500)}</td>
            </tr>
            <tr>
              <td>Nightclubs, bars, taverns, dance halls and buildings for similar purposes</td>
              <td>{Math.ceil(male/40)}</td>
              <td>{Math.ceil(female/40)}</td>
              <td>{Math.floor((Math.ceil(male/40))*0.67)}</td>
              <td>{Math.ceil(male/75)}</td>
              <td>{Math.ceil(female/75)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/500)}</td>
            </tr>
            <tr>
              <td>Restaurants, banquet halls and food courts</td>
              <td>{Math.ceil(male/75)}</td>
              <td>{Math.ceil(female/75)}</td>
              <td>{Math.floor((Math.ceil(male/75))*0.67)}</td>
              <td>{Math.ceil(male/200)}</td>
              <td>{Math.ceil(female/200)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/500)}</td>
            </tr>
            <tr>
              <td>Casino gaming areas</td>
              <td>{CasinoMaleWcCount}</td>
              <td>{CasinoFemaleWcCount}</td>
              <td>{Math.floor((CasinoMaleWcCount)*0.67)}</td>
              <td>{CasinoMaleWbCount}</td>
              <td>{CasinoFemaleWbCount}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/1000)}</td>
            </tr>
            <tr>
              <td>Auditoriums without permanent seating, art galleries, exhibition halls, museums,lecture halls, libraries, arcades and gymnasiums</td>
              <td>{Math.ceil(male/125)}</td>
              <td>{Math.ceil(female/65)}</td>
              <td>{Math.floor((Math.ceil(male/125))*0.67)}</td>
              <td>{Math.ceil(male/200)}</td>
              <td>{Math.ceil(female/200)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/500)}</td>
            </tr>
            <tr>
              <td>Passenger terminals and transportation facilities</td>
              <td>{Math.ceil(male/500)}</td>
              <td>{Math.ceil(female/500)}</td>
              <td>{Math.floor((Math.ceil(male/500))*0.67)}</td>
              <td>{Math.ceil(male/750)}</td>
              <td>{Math.ceil(female/750)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/1000)}</td>
            </tr>
            <tr>
              <td>Places of worship and other religious services</td>
              <td>{Math.ceil(male/150)}</td>
              <td>{Math.ceil(female/75)}</td>
              <td>{Math.floor((Math.ceil(male/150))*0.67)}</td>
              <td>{Math.ceil(male/200)}</td>
              <td>{Math.ceil(female/200)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/1000)}</td>
            </tr>
            <tr>
              <td>Coliseums, arenas, skating rinks, pools and tennis courts for indoor sporting events and activities</td>
              <td>{SportMaleWcCount}</td>
              <td>{SportFemaleWcCount}</td>
              <td>{Math.floor(SportMaleWcCount*0.67)}</td>
              <td>{Math.ceil(male/200)}</td>
              <td>{Math.ceil(female/150)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/1000)}</td>
            </tr> 
            <tr>
              <td>Stadiums, amusement parks, bleachers and grandstands for outdoor sporting events and activities</td>
              <td>{SportMaleWcCount}</td>
              <td>{SportFemaleWcCount}</td>
              <td>{Math.floor(SportMaleWcCount*0.67)}</td>
              <td>{Math.ceil(male/200)}</td>
              <td>{Math.ceil(female/150)}</td>
              <td>-</td>
              <td>{Math.ceil(occupancyLoad/1000)}</td>
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

export default Assembly;