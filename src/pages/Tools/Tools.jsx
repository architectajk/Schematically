import React,{useContext} from 'react'
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import { Link } from 'react-router-dom';
import '../../assets/CSS/Tools.css'

const Tools =()=> {
  const { mode } = useContext(SchematicContext);

  const groupedTools = {
    compliance: [
      {
        name: 'Sanitation Norms',
        description: 'Helps calculate required sanitary fixtures per occupancy',
        path: '/tools/SanReq',
        logo: '/images/tools/metal-calc.svg',
        status: 'active'
      },
      {
        name: 'Light & Ventilation',
        description: 'Ensures compliance for natural lighting & air flow',
        path: '/tools/NaturalLightVentCalc',
        status: 'beta'
      },
      {
        name: 'Fire Safety',
        description: 'Checks fire escape and safety compliance',
        path: '/tools/FireLifeSafety',
        status: 'coming-soon'
      },
      {
        name: 'Parking Norms',
        description: 'Calculates required parking by land use',
        path: '/tools/ParkingNorms',
        status: 'beta'
      }
    ],
    planning: [
      {
        name: 'Scale Calc',
        description: 'Converts real-world and drawing scale units',
        path: '/tools/ScaleCalc',
        status: 'active'
      },
      {
        name: 'Area Statement',
        description: 'Specifies occupancy-wise classification and area breakdown logic for built-up and carpet area.',
        path: '/tools/AreaStatement',
        status: 'coming-soon'
      },
      {
        name: 'Elevator Planner',
        description: 'Plans elevator size and count by building use',
        path: '/tools/ElevatorPlanner',
        status: 'coming-soon'
      }
    ],
    material: [
      {
        name: 'Metal Calculator',
        description: 'Estimates metal weight & cost',
        path: '/tools/MetalCalc',
        logo: '/images/tools/metal-calc.svg',
        status: 'beta'
      }
    ]
  };

    // Returns a Bootstrap badge class based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="badge bg-success ms-2">Active</span>;
      case 'coming-soon':
        return <span className="badge bg-secondary ms-2">Coming Soon</span>;
      case 'beta':
        return <span className="badge bg-warning text-dark ms-2">Beta</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container" data-bs-theme={mode}>
      <div className='col-sm-8'>
        <h4 className={`fw-bold mb-3 text-${mode === 'light' ? 'dark' : 'light'}`}>1. Code & Compliance</h4>
          <ul className="list-group shadow-sm">
            {groupedTools.compliance.map((tool, j) => (
              <li key={j} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="me-auto">
                  <h6 className="mb-1">
                    <Link to={tool.path} className="text-decoration-none">
                     {j+1}.<span> </span>{tool.name}
                    </Link>
                  </h6>
                  <p className="mb-0 text-muted small">{tool.description}</p>
                </div>
                {getStatusBadge(tool.status)}
              </li>
            ))}
          </ul>
          <div className="mb-5"></div>
        <h4 className={`fw-bold mb-3 text-${mode === 'light' ? 'dark' : 'light'}`}>2. Design & Planning</h4>
          <ul className="list-group shadow-sm">
            {groupedTools.planning.map((tool, j) => (
              <li key={j} className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row">
                <div className="me-auto">
                  <h6 className="mb-1">
                    <Link to={tool.path} className="text-decoration-none">
                     {j+1}.<span> </span>{tool.name}
                    </Link>
                  </h6>
                  <p className="mb-0 text-muted small">{tool.description}</p>
                </div>
                {getStatusBadge(tool.status)}
              </li>
            ))}
          </ul>
          <div className="mb-5"></div>
        <h4 className={`fw-bold mb-3 text-${mode === 'light' ? 'dark' : 'light'}`}>3. Material & Quantity</h4>
          <ul className="list-group shadow-sm">
            {groupedTools.material.map((tool, j) => (
              <li key={j} className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row">
                <div className="me-auto">
                  <h6 className="mb-1">
                    <Link to={tool.path} className="text-decoration-none">
                     {j+1}.<span> </span>{tool.name}
                    </Link>
                  </h6>
                  <p className="mb-0 text-muted small">{tool.description}</p>
                </div>
                {getStatusBadge(tool.status)}
              </li>
            ))}
          </ul>
          <div className="mb-5"></div>
      </div>
    </div>
  );
}

export default Tools;
