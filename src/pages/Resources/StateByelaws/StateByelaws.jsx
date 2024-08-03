import React,{useContext, useState} from 'react';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import IndiaComponent from './IndiaSvg';
import '../StateByelaws/StateByelaws.css'
import { Tooltip } from 'react-tooltip';

const StateByelaws = () => {
   const {mode} = useContext(SchematicContext);
   const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
   const [selectedState, setSelectedState] = useState('Delhi');

   const handleStateClick = (stateName) => {
     setSelectedState(stateName);
   };
  return (
  <div className='container'>
    <h1 className={textColorClass}>State-wise Building Regulations</h1>
    <div className="row">
      <div className="col-md-6">
        <div className='d-flex justify-content-center'>
        <IndiaComponent onStateClick={handleStateClick}/>
        <Tooltip anchorSelect="#my-anchor-element-INAN" content="Andaman & Nicobar"/>
        <Tooltip anchorSelect="#my-anchor-element-INTG" content="Telangana"/>
        <Tooltip anchorSelect="#my-anchor-element-INAP" content="Andhra Pradesh"/>
        <Tooltip anchorSelect="#my-anchor-element-INAR" content="Arunachal Pradesh"/>
        <Tooltip anchorSelect="#my-anchor-element-INAS" content="Assam"/>
        <Tooltip anchorSelect="#my-anchor-element-INBR" content="Bihar"/>
        <Tooltip anchorSelect="#my-anchor-element-INCH" content="Chandigarh"/>
        <Tooltip anchorSelect="#my-anchor-element-INCT" content="Chhattisgarh"/>
        <Tooltip anchorSelect="#my-anchor-element-INDH" content="Dādra and Nagar Haveli and Damān and Diu"/>
        <Tooltip anchorSelect="#my-anchor-element-INDL" content="Delhi"/>
        <Tooltip anchorSelect="#my-anchor-element-INGA" content="Goa"/>
        <Tooltip anchorSelect="#my-anchor-element-INGJ" content="Gujarat"/>
        <Tooltip anchorSelect="#my-anchor-element-INHR" content="Haryana"/>
        <Tooltip anchorSelect="#my-anchor-element-INHP" content="Himachal Pradesh"/>
        <Tooltip anchorSelect="#my-anchor-element-INJH" content="Jharkhand"/>
        <Tooltip anchorSelect="#my-anchor-element-INKA" content="Karnataka"/>
        <Tooltip anchorSelect="#my-anchor-element-INKL" content="Kerala"/>
        <Tooltip anchorSelect="#my-anchor-element-INMP" content="Madhya Pradesh"/>
        <Tooltip anchorSelect="#my-anchor-element-INMH" content="Maharashtra"/>
        <Tooltip anchorSelect="#my-anchor-element-INMN" content="Manipur"/>
        <Tooltip anchorSelect="#my-anchor-element-INML" content="Meghalaya"/>
        <Tooltip anchorSelect="#my-anchor-element-INMZ" content="Mizoram"/>
        <Tooltip anchorSelect="#my-anchor-element-INNL" content="Nagaland"/>
        <Tooltip anchorSelect="#my-anchor-element-INOR" content="Orissa"/>
        <Tooltip anchorSelect="#my-anchor-element-INPY" content="Puducherry"/>
        <Tooltip anchorSelect="#my-anchor-element-INPB" content="Punjab"/>
        <Tooltip anchorSelect="#my-anchor-element-INRJ" content="Rajasthan"/>
        <Tooltip anchorSelect="#my-anchor-element-INSK" content="Sikkim"/>
        <Tooltip anchorSelect="#my-anchor-element-INTN" content="Tamil Nadu"/>
        <Tooltip anchorSelect="#my-anchor-element-INTR" content="Tripura"/>
        <Tooltip anchorSelect="#my-anchor-element-INUP" content="Uttar Pradesh"/>
        <Tooltip anchorSelect="#my-anchor-element-INUT" content="Uttarakhand"/>
        <Tooltip anchorSelect="#my-anchor-element-INWB" content="West Bengal"/>
        <Tooltip anchorSelect="#my-anchor-element-INLD" content="Lakshadweep"/>
        <Tooltip anchorSelect="#my-anchor-element-INJK" content="Jammu and Kashmir"/>
        <Tooltip anchorSelect="#my-anchor-element-INLA" content="Ladakh"/>
        </div>
      </div>
      <div className='col-md-6'>
        <h2 className={textColorClass}>{selectedState}</h2>
        <p className={textColorClass}>Additional information about {selectedState}...</p>
        {
        //<iframe className="container" src="https://drive.google.com/file/d/1BXggZwOi4jKA9pmQIIiOweBMPks7lEwv/preview" height={500}/>
        }
      </div>
    </div>
  </div>
  )
}

export default StateByelaws
