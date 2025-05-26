import React, { useContext } from 'react';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import { Link } from 'react-router-dom';
import '../../assets/CSS/CodeCompliance.css'; // Optional for styling

const tools = [
  {
    name: "Sanitation Calculator",
    description: "Calculate sanitation requirements as per NBC/IBC standards.",
    tags: ["NBC", "Sanitation", "IBC"],
    path: "/tools/SanReq"
  },
  {
    name: "Natural Light & Ventilation",
    description: "Check compliance for daylight and air circulation norms.",
    tags: ["IRC", "Light", "Ventilation"],
    path: "/tools/NaturalLightVentCalc"
  },
  {
    name: "Fire Safety Checker",
    description: "Evaluate escape paths and fire compliance from NBC Part 4.",
    tags: ["NBC", "Fire Safety", "Egress"],
    path: "/tools/FireSafety"
  }
];

export default function CodeCompliance() {
  const { mode } = useContext(SchematicContext);

  return (
    <div className="container py-4" data-bs-theme={mode}>
      <h1 className={`text-${mode === 'light' ? 'dark' : 'light'} mb-4`}>
        Code & Compliance Tools
      </h1>
      <ol className={`list-group list-group-numbered`}>
        {tools.map((tool, i) => (
          <li
            key={i}
            className={`list-group-item list-group-item-${mode === 'light' ? 'light' : 'dark'} d-flex justify-content-between align-items-start`}
          >
            <div className="ms-2 me-auto">
              <div className="fw-semibold">{tool.name}</div>
              <div className="small text-muted">{tool.description}</div>
              <div className="mt-1">
                {tool.tags.map((tag, idx) => (
                  <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                ))}
              </div>
            </div>
            <Link to={tool.path} className="btn btn-outline-primary btn-sm align-self-center">
              Open
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}