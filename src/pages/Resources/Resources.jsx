import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import '../../assets/CSS/Resources.css'

export default function Resources() {
  const {mode} = useContext(SchematicContext);
  return (
<div className="row" data-bs-theme={mode}>
  <div className="col-sm-6 mb-3 mb-sm-0">
    <div className={`card card-${mode} h-100`}>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">National Building Code of India 2016</h5>
        <p className="card-text d-flex flex-grow-1">The National Building Code of India (NBC), a comprehensive building Code, is a national instrument providing guidelines
                    for regulating the building construction activities across the country. It serves as a Model Code for adoption by all
                    agencies involved in building construction works be they Public Works Departments, other government construction departments,
                    local bodies or private construction agencies.</p>
        <div className='text-start'>
        <Link to="/resources/NBC" className="btn btn-primary">Read the Doc</Link>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6 mb-3 mb-sm-0">
    <div className={`card card-${mode} h-100`}>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">State-wise Model Byelaws</h5>
        <p className="card-text d-flex flex-grow-1">Byelaws of various states of India</p>
        <div className="text-start">
        <Link to="/resources/StateByelaws" className="btn btn-primary">Read</Link>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
