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
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

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
    <div className='container mb-4'>  
<div className="row gx-4">
<h1 className={`text-${mode==='light'?'dark':'light'} d-flex mb-4`}>NBC / IBC Sanitation Requirements</h1>
  <div className="col-lg-6 col-sm-auto">
    <div className='d-flex-column' data-bs-theme={mode}>
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">NBC / IBC</label>
            <select className="form-select" id="inputGroupSelect01" value={bcode} onChange={handleBcodeChange}>
            {BcodeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            ))}
        </select>
        </div>
        <div className="input-group">
            <label className="input-group-text" htmlFor="inputGroupSelect02">Select Occupancy</label>
            <select className="form-select" id="inputGroupSelect02" value={occupancy} onChange={handleOccupancyChange}>
            {availableOccupancyTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
            ))}
        </select>
        </div>
        <div>
        <h2 className={`${textColorClass} d-flex my-4`}>{renderResult()}</h2>
        {getOccupancyComponent()}
        </div>
    </div>
  </div>
  <div className="col-lg-6 col-sm-auto">
        <div className='mb-3'>
          <h3 className={textColorClass}>General</h3>
          <p className={textColorClass}>There should be at least one water tap and arrangement
          for drainage in the vicinity of each water closet 
          or group of water closet in all the buildings.
          </p>
        </div>
        <div className='my-3'>
          <p className={textColorClass}>Each dwelling unit on premises (abutting on a
          sewer or with a private sewage disposal system) shall
          have at least one water closet, one kitchen wash place
          or a sink, and one bathing place or shower to meet
          the basic requirements of sanitation and personal
          hygiene.
          </p>
        </div>
        <div className='my-3'>
          <p className={textColorClass}>In case of a group housing, the requirements relating
          to toilet or sanitary room and kitchen as given in 13
          and B-9 of Part 3 'Development Control Rules and
          General Building Requirements' of the Code shall also
          be complied with.
          </p>
        </div>
        <div className='my-3'>
          <p className={textColorClass}>All other structures for human occupancy or use
          on premises (abutting on a sewer or with a private
          sewage disposal system) shall have adequate sanitary
          facilities, but in no case less than one water closet and
          one other fixture for cleaning purposes
          </p>
        </div>
        <div className='mb-3'>
          <h3 className={textColorClass}>For Residences</h3>
          <p className={textColorClass}> Dwelling with individual convenience shall
          have at least the following fitments:
            <ul className="list-unstyled my-3">
              <li>1. One bath room provided with a tap and a floor trap</li>
              <li>2. One water closet with flushing apparatus withan ablution tap and</li>
              <li>3. One tap with a floor trap or a sink in kitchen or wash place.</li>
            </ul>
          </p>
          <p className={textColorClass}> Dwellings without individual conveniences shall
            have the following fitments:
            <ul className="list-unstyled my-3">
              <li>1. One water tap with floor trap in each tenement</li>
              <li>2. One water closet with flushing apparatus and one ablution tap bath for every two tenements, and</li>
              <li>3. One bath with water tap and floor trap for every two tenements.</li>
            </ul>
          </p>
          <h3 className={textColorClass}>For Buildings Other than Residences</h3>
          <p className={`${textColorClass} my-3`}>The requirements for fitments for drainage and
          sanitation in the case of buildings other than residences
          shall be in accordance with Table 1 to Table 15.
          </p>
          <p className={`${textColorClass} my-3`}>The accessibility requirements for provision of these
          facilities for persons with disabilities shall be in
          accordance with 13 of Part 3 'Development Control
          Rules and General Building Requirements' of the Code
          </p>
          <p className={`${textColorClass} my-3`}>The following shall be, in addition, taken into consideration
            <ul className="list-unstyled my-3">
              <li>1. Minimum fixture requirement is based on 1 fixture per indicated number of persons or part thereof.</li>
              <li>2. Building categories not in tables should be considered separately by the Authority.</li>
              <li>3. Drinking fountains are not allowed in toilets.</li>
              <li>4. For exposure to harmful materials, wash basins with eye wash and emergency showers must be provided.</li>
              <li>5. Consider accessibility; numerical basis may not suit specific building needs. Schools need toilets on each floor.</li>
              <li>6. Buildings abutting sewers must provide minimum sanitary facilities. If disposal facilities are absent, include them in building design.</li>
              <li>7. Workplaces with crèches need 1 WC for 10 persons, 1 wash basin for 15 persons, and a kitchen sink with a drinking water tap.</li>
              <li>8. Executive areas and meeting rooms should have individual toilets and pantries based on user requirements.</li>
              <li>9. Indoor consumption areas may use water stations instead of drinking water fountains.</li>
            </ul>
            </p>
      </div>
  </div>
</div>
</div> 
  )
}
