import React,{useState} from 'react'
import NumericInput from '../SanReq/NumericInput';

const OccupancyTypes=[
 {value:1, label:"1. Group A1 - Multi/Single Dwellings Units / Apartments"},
 {value:2, label:"2. Group A2 - Lodging Houses & Special residential"},
 {value:3, label:"3. Group B - Educational - High schools, Higher Secondary, Industrial Training and Technical School"},
 {value:4, label:"4. Group B - Educational - Higher educational institutions"},
 {value:5, label:"5. Group C - Medical/Hospital"},
 {value:6, label:"6. Group D - Assembly"},
 {value:7, label:"7. Group E - Office Building"},
 {value:8, label:"8. Group F - Mercantile/Commercial Building"},
 {value:8, label:"9. Group G1/G2 - Industrial-1/2 Building"},
 {value:9, label:"10. Group H - Storage"},
 {value:10, label:"11. Group J - Multiplex complex"},
];

const ParkingNormsKerala = () => {

  const[area,setArea]=useState(0);
  const[occupancyTypes,setOccupancyTypes]=useState("1");
  
  const getECS=()=>{
       
    }
  const ParkingStandards=()=>{
    let cars=0;
    if(occupancyTypes==="1"){
      if(area>300){cars=(0.006*area)+(0.01*(area-300));return Math.round(cars);}
      else{cars=0.006*area;return Math.round(cars);}
    }   
    else{
      cars=(getECS()/100)*area;
      return Math.round(cars);
    }
  }
  return (
    <>
      <div>
      <div className="input-group my-3" >
        <label className="input-group-text" htmlFor="inputGroupSelect03">Category</label>
        <select className="form-select" id="inputGroupSelect03" value={occupancyTypes} onChange={(e)=>setOccupancyTypes(e.target.value)}>
        {OccupancyTypes.map((option)=>(
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
      </div> 
      <div className="input-group my-3">
        <NumericInput span="Floor Area/ BUA" value={area} onChange={setArea}/>
      </div>
      <div className="input-group my-3">
        <NumericInput span="Parking Standards" value={ParkingStandards()} readOnly/>
      </div> 
      </div>
    </>
  )
}
export default ParkingNormsKerala