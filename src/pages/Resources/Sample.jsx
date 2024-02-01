import React from 'react'
//import {useContext} from 'react';
//import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';

const Sample = () => {
    //const {mode} = useContext(SchematicContext);
  return (
    <div>
      <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">Toggle offcanvas</button>
      <div className="alert alert-info d-none d-lg-block">Resize your browser to show the responsive offcanvas toggle.</div>
      <div className="offcanvas-lg offcanvas-start" tabIndex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <p className="mb-0">This is content within an <code>.offcanvas-lg</code>.</p>
        </div>
      </div>
    </div>
  )
}

export default Sample
