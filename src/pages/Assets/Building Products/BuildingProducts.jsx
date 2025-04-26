import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';

const BuildingProducts = () => {
  const {mode} = useContext(SchematicContext);
  return (
    <div className='container'>
    <div className="row g-4 mb-4" data-bs-theme={mode}>
      <div className="col-3 col-md-3">
        <NavLink to="/assets/BuildingProducts/Nuvocotto"><img src="/Assests/Nuvocotto/NuvocottoImages/nuvocotto-productcatalog-image.png" className="img-fluid" alt="" /></NavLink>
      </div>
      <div className="col-3 col-md-3">
        <NavLink to="/assets/BuildingProducts/Nuvocotto"><img src="/Assests/Danpal/DanpalImages/Danpal_productcatalogimage.png" className="img-fluid" alt="" /></NavLink>
      </div>
      <div className="col-3 col-md-3">
        <NavLink to="/assets/BuildingProducts/Nuvocotto"><img src="/Assests/Tostem/TostemImages/Tostem_productcatalogimage.png" className="img-fluid" alt="" /></NavLink>
      </div>
      <div className="col-3 col-md-3">
      <NavLink to="/assets/BuildingProducts/Nuvocotto"><img src="/Assests/Coolant/CoolantImages/Coolant_productcatalogimage.png" className="img-fluid" alt="" /></NavLink>
      </div>
    </div>
    <div className="row g-4" data-bs-theme={mode}>
      <div className="col-3">
        <NavLink to="/assets/BuildingProducts/Nuvocotto"><img src="/Assests/Jaquar/Jaquar_productcatalogimage.png" className="img-fluid" alt="" /></NavLink>
      </div>
      <div className="col-3">
        <NavLink to="/assets/BuildingProducts/Nuvocotto"><img src="/Assests/Artize/Artize_productcatalogimage.png" className="img-fluid" alt="" /></NavLink>
      </div>
    </div>  
    </div>
  )
}

export default BuildingProducts
