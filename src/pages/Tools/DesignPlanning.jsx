import React, { useContext } from 'react';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import { Link } from 'react-router-dom';

const tools = [
  {
    name: "Elevator Planner",
    description: "Plan elevator shaft dimensions and passenger capacity.",
    tags: ["Elevator", "Vertical Transport", "Shaft"],
    path: "/tools/ElevatorPlanner"
  },
  {
    name: "Parking Requirement Estimator",
    description: "Calculate parking space as per urban zoning norms.",
    tags: ["NBC", "Zoning", "Transport"],
    path: "/tools/ParkingReq"
  },
  {
    name: "Scale Converter",
    description: "Convert measurements across architectural drawing scales.",
    tags: ["Drawing", "Conversion", "Architecture"],
    path: "/tools/ScaleCalc"
  }
];

export default function DesignPlanning() {
  const { mode } = useContext(SchematicContext);

  return (
    <div className="container py-4" data-bs-theme={mode}>
      <h1 className={`text-${mode === 'light' ? 'dark' : 'light'} mb-4`}>
        Design & Planning Tools
      </h1>
      <ol className="list-group list-group-numbered">
        {tools.map((tool, i) => (
          <li
            key={i}
            className={`list-group-item list-group-item-${mode === 'light' ? 'light' : 'dark'} d-flex justify-content-between align-items-start`}
          >
            <div className="ms-2 me-auto">
              <div className="fw-semibold">{tool.name}</div>
              <div className="text-muted small">{tool.description}</div>
              <div className="mt-1">
                {tool.tags.map((tag, idx) => (
                  <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                ))}
              </div>
            </div>
            <Link to={tool.path} className="btn btn-outline-primary btn-sm">Open</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
