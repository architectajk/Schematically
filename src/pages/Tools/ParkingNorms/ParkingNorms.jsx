import React,{useState,useContext} from 'react'
import NMC from './ParkingNormsNMC';
import Karnataka from "../ParkingNorms/ParkingNormsKarnataka"
import Kerala from "../ParkingNorms/ParkingNormsKerala"
import NumericInput from '../SanReq/NumericInput';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';

const ModelStateByelaw = [
  { value: "1", label: "Model Building Bye-Laws (2016)" },
  { value: "2", label: "Medical Council of India"},
  { value: "3", label: "Karnataka" },
  { value: "4", label: "Kerala"},
  { value: "5", label: "Maharastra",},
  { value: "6", label: "Tamil Nadu",},
  { value: "7", label: "Delhi",},
];

const OccupancyTypes = [ //Model Building Bye-Laws (2016)
  {value:"1", label: "1. Residential"},
  {value:"2", label: "2. Commercial"},
  {value:"3", label: "3. SocioCulturalFacilities"},
  {value:"4", label: "4. PublicSemiPublic"},
  {value:"5", label: "5. Industry"},
  ];

const occupancyTypesResidential = [ //Model Building Bye-Laws (2016) - subcategory 
  {value:"1", label:  "1. Residential Plot Plotted Housing",ECS:2},
  {value:"2", label:  "2. Residential Plot  Group Housing",ECS:2},
  {value:"3", label:  "3. Cluster Court Housing",ECS:2},
  {value:"4", label:  "4. Guest House / Lodging & Boarding House / Dharamshala",ECS:2},
  ]; 
const occupancyTypesCommercial = [ //Model Building Bye-Laws (2016) - subcategory
  {value:"1", label: "1. Convenience Shopping Centre/Local Shopping Centre",ECS:2},
  {value:"2", label: "2. Service Market",ECS:2},
  {value:"3", label: "3. Community Centre",ECS:3},
  {value:"4", label: "4. District Centre/ SubCentral Business District/SubCity Level Commercial areas",ECS:3},
  {value:"5", label: "5. Commercial Plot: Retail & Commerce Metropolitan City Centre",ECS:3},
  {value:"6", label: "6. Hotel",ECS:3},
  {value:"7", label: "7. Service Apartments",ECS:3},
  {value:"8", label: "8. commercial component along with Railway/MRTS and ISBT",ECS:3},
  {value:"9", label: "9. Integrated Freight Complex/ Wholesale Market",ECS:3},
  {value:"10",label: "10. Mixed LandUse",ECS:2}
  ];
const occupancyTypesSocioCulturalFacilities = [ //Model Building Bye-Laws (2016) - subcategory
  {value:"1", label: "1. Community Hall",ECS:3},
  {value:"2", label: "2. Recreational Club",ECS:2},
  {value:"3", label: "3.Socio cultural activities such asauditorium, music, dance & drama,centre / meditation, spiritual centre etc.",ECS:2},
  {value:"4", label: "4. Science Centre",ECS:2},
  {value:"5", label: "5. International Convention centre",ECS:2},
  {value:"6", label: "6. Old Age Home / Care Centre for Physically / Mentally challenged / Working women / men hostel /Adult Education Centre / Orphanage /Children's Centre / Night Shelter",ECS:1.8},
  {value:"7", label: "7. Sport facility for international sports event",ECS:2},
  ];
const occupancyTypesPublicSemiPublic = [ //Model Building Bye-Laws (2016) - subcategory
  {value:"1", label:"1. Integrated Office Complex",ECS:1.8},
  {value:"2", label:"2. District Court",ECS:1.8},
  {value:"3", label:"3. Head Post Office with Administrative office & with / without delivery office",ECS:1.33},
  {value:"4", label:"4. Amusement Park",ECS:3},
  {value:"5", label:"5. ISBT/Metro",ECS:2},
  {value:"6", label:"6. Hospitals",ECS:2},
  {value:"7", label:"7. Veterinary Hospital/ Dispensary",ECS:1.33},
  {value:"8", label:"8. Nursing and Paramedic institute",ECS:2},
  ]; 
const occupancyTypesIndustry = [ //Model Building Bye-Laws (2016) - subcategory
  {value:"1", label: "1. Industrial Plot",ECS:2},
  ]; 

const ParkingNormsModel=()=>{
  
  const[occupancyTypes,setOccupancyTypes]=useState('1');
  const[subcategory,setSubcatergory]=useState('1');
  const[area,setArea]=useState(0);

  const selectedsubcategory=()=>{
    switch(occupancyTypes){
      case "1":
        return occupancyTypesResidential;
      case "2":
        return occupancyTypesCommercial;
      case "3":
        return occupancyTypesSocioCulturalFacilities;
      case "4":
        return occupancyTypesPublicSemiPublic;
      case "5":
        return occupancyTypesIndustry;
      default:
        return ;        
    }
  }
  const getECS=()=>{
    switch(occupancyTypes){
      case "1":
        const ResidentialECS=occupancyTypesResidential.find((option)=>option.value===subcategory);
        return ResidentialECS?ResidentialECS.ECS:null;
      case "2":
        const CommercialECS=occupancyTypesCommercial.find((option)=>option.value===subcategory);
        return CommercialECS?CommercialECS.ECS:null;
      case "3":
        const SocioCulturalECS=occupancyTypesSocioCulturalFacilities.find((option)=>option.value===subcategory);
        return SocioCulturalECS?SocioCulturalECS.ECS:null;
      case "4":
        const PublicSemiPublicECS=occupancyTypesPublicSemiPublic.find((option)=>option.value===subcategory);
        return PublicSemiPublicECS?PublicSemiPublicECS.ECS:null;
      case "5":
        const IndustryECS=occupancyTypesIndustry.find((option)=>option.value===subcategory);
        return IndustryECS?IndustryECS.ECS:null;
      default:
        return ;        
    }
  }

  const ParkingStandards=()=>{
    let cars=0;
    if(subcategory==="1"){
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
        <div className="input-group my-3" >
          <label className="input-group-text" htmlFor="inputGroupSelect02">Occupancy</label>
          <select className="form-select" id="inputGroupSelect02" value={occupancyTypes} onChange={(e)=>setOccupancyTypes(e.target.value)}>
          {OccupancyTypes.map((option)=>(
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </select>
        </div>
        <div className="input-group my-3" >
          <label className="input-group-text" htmlFor="inputGroupSelect03">Subcategory</label>
          <select className="form-select" id="inputGroupSelect03" value={subcategory} onChange={(e)=>setSubcatergory(e.target.value)}>
          {selectedsubcategory().map((option)=>(
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
    </>
  )
}

const ParkingNorms = () => {
  
  const {mode} = useContext(SchematicContext);
  const[modelStateByelaw,setModelStateByelaw]=useState('1');
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  const selectedByelaw=()=>{
    switch(modelStateByelaw){
      case "1":
        return <ParkingNormsModel/>;
      case "2":
        return <NMC/>
      case "3":
        return <Karnataka/>
      case "4":
        return <Kerala/>
      default:
        return ;
    }
  }

  return (
    <>
    <div>
    <div className='row' data-bs-theme={mode}>
    <div className="col-lg-6">
    <h1 className={`${textColorClass}`}>Parking Norms</h1>
      <div className="input-group mt-4 mb-2">
      <label className="input-group-text" htmlFor="inputGroupSelect01">Model / State Byelaw</label>
      <select className="form-select" id="inputGroupSelect01" value={modelStateByelaw} onChange={(e)=>setModelStateByelaw(e.target.value)}>
        {ModelStateByelaw.map((option)=>(
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
        ))}
      </select>
      </div>
      <>{selectedByelaw()}</>
    </div>
    <div className="col-lg-6 my-4 ">
      <p className={textColorClass}>
        Parking space shall be provided for different types of development as per norms given
        in Master Plan/Development Plan.</p>
      <p className={textColorClass}>
        The following may be referred to for deciding the parking norms for
        different use zone/activities only minimum required value of ECS and NOT a range
        should be specified in the development plan. It can be changed in subsequent plan
        depending upon need based upon local vehicle ownership, mass transportation and
        consequent parking needs.</p>
    </div>
    </div>
    </div>
    </>
  )

}
export default ParkingNorms
