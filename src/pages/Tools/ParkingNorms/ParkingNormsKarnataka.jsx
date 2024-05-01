import React,{useState} from 'react'
import NumericInput from '../SanReq/NumericInput';

const cities=[ //Karnataka cities
  {value:"1",label:"1. Bengaluru"},
  {value:"2",label:"2. Mangaluru"},
  {value:"3",label:"3. Mysuru "},
]
const occupancyTypesBengaluru =[ //Bengaluru Zonal Regulations 2031
  {value:"1",label: "Choose..."},
  {value:"2",label: "1. Theaters and Auditoriums except Educational"},
  {value:"3",label: "2. Retail Business ( shops,Shopping complexes, Malls,etc)"},
  {value:"4",label: "3. Multiplex integrated with shopping"},
  {value:"5",label: "4. Wholesale and Warehouse buildings"},
  {value:"6",label: "5. Restaurant establishment servicing food and drinks"},
  {value:"7",label: "6. Lodging establishments,hotels and Tourist homes"},
  {value:"8",label: "7. Star hotels"},
  {value:"9",label: "8. Office buildings (Govt/Semi-Govt.& Private)"},
  {value:"10",label: "9. Hostels"},
  {value:"11",label: "10. Industrial Buildings"},
  {value:"12",label: "11. Nursing homes"},
  {value:"13",label: "12. Hospitals"},
  {value:"14",label: "13. Multi/Single Dwellings Units"},
  {value:"15",label: "14. Convention centers and Recreational clubs"},
  {value:"16",label: "15. Educational buildings"},
  {value:"17",label: "16. Banquet Halls/ Marriage Gardens/ Kalyana mantaps"},
  {value:"18",label: "17. IT BT and Major Office Complexes with TBA above 20000 sqm"},
  {value:"19",label: "18. Parks/ Gardens, PlayGrounds, Sports Facilities including Sports Complex/ Swimming Pools including Stadiums"},
  {value:"20",label: "19. Burial grounds/cemeteries and cremation grounds"},
  {value:"21",label: "20. Stadium"},
  ];
  const occupancyTypesMangaluru =[ //Mangaluru Zonal Regulations 2021
  {value:"1",label: "Choose..."},
  {value:"2",label: "1. Residential buildings upto 4 dwelling units."},
  {value:"3",label: "2. Multi dwelling apartments building."},
  {value:"4",label: "3. Lodging establishments, tourist homes, hotels"},
  {value:"5",label: "4. Educational"},
  {value:"6",label: "5. Hospital & Nursing homes"},
  {value:"7",label: "6. Assembly/Auditorium"},
  {value:"8",label: "7. Banks and other Retail business"},
  {value:"9",label: "8. Industrial"},
  {value:"10",label: "9. Storage/Wholesale Business"},
  {value:"11",label: "10. Community Hall / Kalyana Mantapa"},
  {value:"12",label: "11. Office building (Government or Private) including IT & BT"},
  {value:"13",label: "12. Restaurant serving food and beverage (excluding toilet areas)"},
  {value:"14",label: "13. Hostels"},
  ];
  const occupancyTypesMysuru =[ //Mysuru Zonal Regulations 2031
  {value:"1",label: "Choose..."},
  {value:"2",label: "1. Theaters and Auditoriums except Educational"},
  {value:"3",label: "2. Retail Business ( shops,Shopping complexes, Malls,etc)"},
  {value:"4",label: "3. Multiplex integrated with shopping"},
  {value:"5",label: "4. Wholesale and Warehouse buildings"},
  {value:"6",label: "5. Restaurant establishment servicing food and drinks"},
  {value:"7",label: "6. Lodging establishments,hotels and Tourist homes"},
  {value:"8",label: "7. Star hotels"},
  {value:"9",label: "8. Office buildings (Govt/Semi-Govt.& Private)"},
  {value:"10",label: "9. Hostels"},
  {value:"11",label: "10. Industrial Buildings"},
  {value:"12",label: "11. Hospitals and Nursing homes"},
  {value:"13",label: "12. Single Family dwelling unit"},
  {value:"14",label: "13. Multi- dwelling Units"},
  {value:"15",label: "14. Convention centers, Kalyana Mantaps and Recreational clubs"},
  {value:"16",label: "15. Educational buildings"},
  {value:"17",label: "16. Other Public and Semi-Public Buildings"},
];
  const ParkingNormsKarnataka = () => {

    const[city,setcity]= useState("1");
    const[occupancyTypes,setOccupancyTypes]=useState("1");
    const[area,setArea]=useState(0);

  const getCity=()=>{
    switch(city){
    case "1":
      return occupancyTypesBengaluru;
    case "2":
      return occupancyTypesMangaluru;
    case "3":
      return occupancyTypesMysuru; 
    default:
      return [];
    }
  }
  const getECS=()=>{
    switch(occupancyTypes){
      case "1":
        const BengaluruECS=occupancyTypesBengaluru.find((option)=>option.value===occupancyTypes);
        return BengaluruECS?BengaluruECS.ECS:null;
      case "2":
        const MangaluruECS=occupancyTypesBengaluru.find((option)=>option.value===occupancyTypes);
        return MangaluruECS?MangaluruECS.ECS:null;
      case "3":
        const MysuruECS=occupancyTypesBengaluru.find((option)=>option.value===occupancyTypes);
        return MysuruECS?MysuruECS.ECS:null;
      default:
        return ;        
    }
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
          <label className="input-group-text" htmlFor="inputGroupSelect02">City</label>
          <select className="form-select" id="inputGroupSelect02" value={city} onChange={(e)=>setcity(e.target.value)}>
          {cities.map((option)=>(
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </select>
        </div>
        <div className="input-group my-3" >
          <label className="input-group-text" htmlFor="inputGroupSelect03">Category</label>
          <select className="form-select" id="inputGroupSelect03" value={occupancyTypes} onChange={(e)=>setOccupancyTypes(e.target.value)}>
          {getCity().map((option)=>(
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
  
  export default ParkingNormsKarnataka