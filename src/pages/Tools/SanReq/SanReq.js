import React,{useEffect, useState, useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import OfficeBuilding from './occupancyTypesNBC/OfficeBuilding';
import Factories from './occupancyTypesNBC/Factories';
import EntertainmentVenues from './occupancyTypesNBC/EntertainmentVenues';
import CulturalInstitutions from './occupancyTypesNBC/CulturalInstitutions';
import IndoorHospitals from './occupancyTypesNBC/IndoorHospitals';
import OutdoorHospitals from './occupancyTypesNBC/OutdoorHospitals';
import AdminHospitals from './occupancyTypesNBC/AdminHospitals';
import HospitalStaff from './occupancyTypesNBC/HospitalStaff';
import Hotels from './occupancyTypesNBC/Hotels';
import Restaurants from './occupancyTypesNBC/Restaurants';
import EducationInstitutions from './occupancyTypesNBC/EducationInstitutions';
import Hostels from './occupancyTypesNBC/Hostels';
import ProduceMarkets from './occupancyTypesNBC/ProduceMarkets';
import TransportHubs from './occupancyTypesNBC/TransportHubs';
import RetailMalls from './occupancyTypesNBC/RetailMalls'; 
import Assembly from './occupancyTypesIBC/Assembly';
import Business from './occupancyTypesIBC/Business';
import Educational from './occupancyTypesIBC/Educational';
import FactoryIndustry from './occupancyTypesIBC/FactoryIndustry';
import Institutional from './occupancyTypesIBC/Institutional';
import Mercantile from './occupancyTypesIBC/Mercantile';
import Residential from './occupancyTypesIBC/Residential';
import Storage from './occupancyTypesIBC/Storage';

const BcodeOptions = [
  { value: "1", label: "National Building Code of India" },
  { value: "2", label: "International Building Code" },
];

const occupancyTypesNBC = [
    "Choose...",
    "1. Office Building",
    "2. Factories",
    "3. Multiplex Cinema, Concert and Convention Halls, Theatres and Stadia",
    "4. Art Galleries, Libraries and Museums",
    "5. Hospitals with Indoor Patient Wards",
    "6. Hospitals with Outdoor Patient Wards",
    "7. Hospitals, Administrative Building",
    "8. Hospitals Staff Quarters and Nurses Homes",
    "9. Hotels",
    "10. Restaurants",
    "11. Schools and Education Institutions",
    "12. Hostels",
    "13. Fruit and Vegetable Markets",
    "14. Bus Stations, Airports and Railway Station",
    "15. Shopping Malls and Retail Building"
  ];

const occupancyTypesIBC =[
    "Choose...",
    "1. Assembly",
    "2. Business",
    "3. Educational",
    "4. FactoryIndustry",
    "5. Institutional",
    "6. Mercantile",
    "7. Residential",
    "8. Storage"
  ];

export default function SanReq() {
  const {mode} = useContext(SchematicContext);

    const [bcode, setBcode] = useState("1");
    const [occupancy,setOccupancy]=useState("Choose...");
    
      // Determine the available occupancy types based on "NBC / IBC" selection
  const availableOccupancyTypes = bcode === "1" ? occupancyTypesNBC : occupancyTypesIBC;

    useEffect(() => {
        // Handle visibility logic for components here
      }, [occupancy]);

    const handleBcodeChange = (e) => {
        setBcode(e.target.value);
      };
      
    const handleOccupancyChange = (e)=>{
        setOccupancy(e.target.value);
    };

    const renderResult=()=>{
        return occupancy === "Choose..." ? "Select the Occupancy" : occupancy;
    };

    const getOccupancyComponent = () => {
        switch (occupancy) {
          case "1. Office Building":
            return <OfficeBuilding />;
          case "2. Factories":
            return <Factories />;
          case "3. Multiplex Cinema, Concert and Convention Halls, Theatres and Stadia":
            return <EntertainmentVenues />;
          case "4. Art Galleries, Libraries and Museums":
            return <CulturalInstitutions />;
          case "5. Hospitals with Indoor Patient Wards":
            return <IndoorHospitals />;
          case "6. Hospitals with Outdoor Patient Wards":
            return <OutdoorHospitals />;
          case "7. Hospitals, Administrative Building":
            return <AdminHospitals />;
          case "8. Hospitals Staff Quarters and Nurses Homes":
            return <HospitalStaff />;
          case "9. Hotels":
            return <Hotels />;
          case "10. Restaurants":
            return <Restaurants />;
          case "11. Schools and Education Institutions":
            return <EducationInstitutions />;
          case "12. Hostels":
            return <Hostels />;
          case "13. Fruit and Vegetable Markets":
            return <ProduceMarkets />;
          case "14. Bus Stations, Airports and Railway Station":
            return <TransportHubs />;
          case "15. Shopping Malls and Retail Building":
            return <RetailMalls />;
          case "1. Assembly":
            return <Assembly/>;
          case "2. Business":
            return <Business/>;
          case "3. Educational":
            return <Educational/>;
          case "4. FactoryIndustry":
            return <FactoryIndustry/>;
          case "5. Institutional":
            return <Institutional/>;
          case "6. Mercantile":
            return <Mercantile/>;
          case "7. Residential":
            return <Residential/>;
          case "8. Storage":
            return <Storage/>;
          default:
            return null;
        }
      };

  return ( 
<div className='d-flex-column' data-bs-theme={mode}>
    <h1 className={`text-${mode==='light'?'dark':'light'} d-flex my-4`}>NBC / IBC Sanitation Requirements</h1>
        <div className="input-group mb-3 w-50">
            <label className="input-group-text" htmlFor="inputGroupSelect01">NBC / IBC</label>
            <select className="form-select" id="inputGroupSelect01" value={bcode} onChange={handleBcodeChange}>
            {BcodeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            ))}
        </select>
        </div>
        <div className="input-group w-50">
            <label className="input-group-text" htmlFor="inputGroupSelect02">Select Occupancy</label>
            <select className="form-select" id="inputGroupSelect02" value={occupancy} onChange={handleOccupancyChange}>
            {availableOccupancyTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
            ))}
        </select>
        </div>
        <h2 className={`text-${mode==='light'?'dark':'light'} d-flex my-4`}>{renderResult()}</h2>
    <div className='d-flex'>
        {getOccupancyComponent()}
    </div>
</div>
  )
}
