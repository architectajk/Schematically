import React, { useContext, useState} from 'react';
import { useRef } from 'react';
import NumericInput from '../SanReq/NumericInput';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import '../../../assets/CSS/MetalCalc.css';
import ISJB from '../MetalCalc/ISJB.json';
import ISLB from '../MetalCalc/ISLB.json';
import ISMB from '../MetalCalc/ISMB.json';
import ISWB from '../MetalCalc/ISWB.json';
import ISNPB from '../MetalCalc/ISNPB.json';
import ISWPB from '../MetalCalc/ISWPB.json';
import ISSC from '../MetalCalc/ISSC.json';
import ISHB from '../MetalCalc/ISHB.json';
import ISJC from '../MetalCalc/ISJC.json';
import ISLC from '../MetalCalc/ISLC.json';
import ISMC from '../MetalCalc/ISMC.json';
import ISMPC from '../MetalCalc/ISMPC.json';
import ISELA from '../MetalCalc/ISELA.json';
import ISUELA from '../MetalCalc/ISUELA.json';
import ISPFBP from '../MetalCalc/ISPFBP.json';
import CHS from '../MetalCalc/ISCircularHollowSections.json';
import SHS from '../MetalCalc/ISSquareHollowSections.json';
import RHS from '../MetalCalc/ISRectangleHollowSections.json';
import SlopingFlangeBeamBlack from '../../../assets/Metal/SlopingFlangeBeam_Black.png'
import SlopingFlangeBeamWhite from '../../../assets/Metal/SlopingFlangeBeam_White.png'
import SlopingFlangeChannelBlack from '../../../assets/Metal/SlopingFlangeChannel_Black.png'
import SlopingFlangeChannelWhite from '../../../assets/Metal/SlopingFlangeChannel_White.png'
import ParallelFlangeBeamBlack from '../../../assets/Metal/ParallelFlangeBeam_Black.png'
import ParallelFlangeBeamWhite from '../../../assets/Metal/ParallelFlangeBeam_White.png'
import ParallelFlangeChannelBlack from '../../../assets/Metal/ParallelFlangeChannel_Black.png'
import ParallelFlangeChannelWhite from '../../../assets/Metal/ParallelFlangeChannel_White.png'
import EqualLegAnglesBlack from '../../../assets/Metal/EqualLegAngle_Black.png'
import EqualLegAnglesWhite from '../../../assets/Metal/EqualLegAngle_White.png'
import UnequalLegAnglesBlack from '../../../assets/Metal/UnequalLegAngle_Black.png'
import UnequalLegAnglesWhite from '../../../assets/Metal/UnequalLegAngle_White.png'
import SqaureBlack from '../../../assets/Metal/SHS_Black.png'
import RectangleBlack from '../../../assets/Metal/RHS_Black.png'
import PipeBlack from '../../../assets/Metal/CHS_Black.png'
import SqaureWhite from '../../../assets/Metal/SHS_White.png'
import RectangleWhite from '../../../assets/Metal/RHS_White.png'
import PipeWhite from '../../../assets/Metal/CHS_White.png'
// Excel export replaced by a dependency-free CSV export (see exportExcel below).
import { saveAs } from 'file-saver';


const Country = [
  { value: '1', label: 'Indian standard Libraries' },
  { value: '2', label: 'American/US standard Libraries' },
  { value: '3', label: 'Australian/NZ standard Libraries' },
  { value: '4', label: 'British standard Libraries' },
  { value: '5', label: 'Canadian standard Libraries' },
  { value: '6', label: 'European standard Libraries' },
];

const MaterialType = [
  { value: '1', label: 'Structural Steel Hollow Sections' },
  { value: '2', label: 'Structural Steel Open Sections' },
  { value: '3', label: 'Reinforcement' },
  { value: '4', label: 'Others' },
];

const IndianOpenSectionClassification = [
  { value: '1', label: '1. Junior beams (ISJB)' },
  { value: '2', label: '2. Light weight beams (ISLB)' },
  { value: '3', label: '3. Medium weight beams (ISMB)' },
  { value: '4', label: '4. Wide flange beams (ISWB)' },
  { value: '5', label: '5. Narrow parallel flange beams (ISNPB)' },
  { value: '6', label: '6. Wide parallel flange beams (ISWPB)' },
  { value: '7', label: '7. Column sections (ISSC)' },
  { value: '8', label: '8. Heavy weight beam (ISHB)' },
  { value: '9', label: '9. Junior channels (ISJC)' },
  { value: '10', label: '10. Light weight channels (ISLC)' },
  { value: '11', label: '11. Medium weight channels (ISMC)' },
  { value: '12', label: '12. Medium weight parallel flange channels (ISMPC)' },
  { value: '13', label: '13. Equal leg angles (ISA)' },
  { value: '14', label: '14. Unequal leg angles (ISA)' },
  { value: '15', label: '15. Parallel flange bearing piles (ISPBP)' },
];

const IndianHollowSectionClassification = [
  { value: '1', label: 'Pipe (CHS)' },
  { value: '2', label: 'Sqaure Profile (SHS)' },
  { value: '3', label: 'Rectangle Profile (RHS)' },
];

// DesignationDropdown component that accepts data as a prop
//CHS
const DesignationDropdown = ({ data, onAdd, onSelect }) => {
  const { mode } = useContext(SchematicContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [length, setLength] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const [nb, thickness] = e.target.value.split('|');
    const matchedOption = data.find(item => 
      String(item.NB) === nb && String(item.Thickness_t_mm) === thickness
    );
    setSelectedOption(matchedOption || null);
    if (onSelect) onSelect(matchedOption || null);
  };
  const handleAddClick = () => {
    if (selectedOption && length && quantity) {
      const mass = parseFloat(selectedOption.Mass || 0);
      const totalWeight = (mass * length * quantity).toFixed(2);
  
      onAdd?.(selectedOption.NB, length, quantity, totalWeight);
  
      setLength(1);
      setQuantity(1);
    }
  };
  const parsedMass = parseFloat((selectedOption?.Mass || "0").toString().replace(/,/g, ''));
  const totalWeight = (parsedMass * Number(length) * Number(quantity)).toFixed(2);

  return (
    <>
      <div className="input-group mb-2">
        <label className="input-group-text metalcalc" htmlFor="inputGroupSelect05">Designation Size</label>
        <select
          className="form-select"
          id="inputGroupSelect05"
          value={selectedOption ? `${selectedOption.NB}|${selectedOption.Thickness_t_mm}` : ""}
          onChange={handleChange}
        >
        <option value="">-- Select --</option>
        {data.map((option, index) => (
          <option key={index} value={`${option.NB}|${option.Thickness_t_mm}`}>
            {option.NB} (OD: {option.OD}, Thickness: {option.Thickness_t_mm})
          </option>
        ))}
      </select>
      </div>

      {selectedOption && (
        <div className="mt-2">
          <div className="input-group mb-2">
            <NumericInput span="Length (m)" value={length} onChange={setLength} customWidth={150} />
          </div>
          <div className="input-group mb-2">
            <label className="input-group-text metalcalc" htmlFor="inputGroupSelect07">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="inputGroupSelect07"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <button className="btn btn-success" onClick={handleAddClick}>Add to Table</button>
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}>
            <strong>Total Weight:</strong>
            <span className="ms-2">{totalWeight} kg</span>
          </p>
        </div>
      )}
    </>
  );
};

// DesignationDropdown component for Hollow Section
//SHS & RHS
const HollowSectionDesignationDropdown = ({ data, onAdd, onSelect}) => {
  const { mode } = useContext(SchematicContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [length, setLength] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const selected = data.find(option => option.Designation_Size === e.target.value);
    setSelectedOption(selected || null);
    if (onSelect) onSelect(selected || null);
  };

  const handleAddClick = () => {
    if (selectedOption && length && quantity) {
      const mass = parseFloat(selectedOption.Weight || 0);
      const totalWeight = (mass * length * quantity).toFixed(2);
  
      onAdd?.(selectedOption.Designation_Size, length, quantity, totalWeight);
  
      setLength(1);
      setQuantity(1);
    }
  };
  const totalWeight = selectedOption ? 
  (parseFloat(selectedOption.Weight) * length * quantity).toFixed(2) : 0;

  return (
    <>
      <div className="input-group mb-2">
        <label className="input-group-text metalcalc" htmlFor="inputGroupSelect05">
        Designation Size
        </label>
        <select
          className="form-select"
          id="inputGroupSelect05"
          value={selectedOption?.Designation_Size || ""}
          onChange={handleChange} 
        >
        <option value="">-- Select --</option>
          {data.map((option, index) => (
          <option key={index} value={option.Designation_Size}>
            {option.Designation_Size}
        </option>
          ))}
        </select>
      </div>
      {selectedOption && (
        <div className="mt-2">
          <div className="input-group mb-2">  
            <NumericInput span="Length (m)" value={length} onChange={setLength} customWidth={150}/>
          </div>
          <div className="input-group mb-2">
            <label className="input-group-text metalcalc" htmlFor="inputGroupSelect07">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <button className="btn btn-success" onClick={handleAddClick}>Add to Table</button>
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}><strong>Total Weight : </strong> 
          <span className="ms-2">{totalWeight} kg</span>
          </p>
        </div>
      )}
    </>
  );
};
// DesignationDropdown component for Open Section
const OpenSectionDesignationDropdown = ({ data, onAdd, onSelect }) => {
  const { mode } = useContext(SchematicContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [length, setLength] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const selected = data.find(option => option.Designation === e.target.value);
    setSelectedOption(selected || null);
    if (onSelect) onSelect(selected || null); // Notify parent
  };

  const handleAddClick = () => {
    if (selectedOption && length && quantity) {
      const mass = parseFloat(selectedOption.Mass || 0);
      const totalWeight = (mass * length * quantity).toFixed(2);
  
      onAdd?.(selectedOption.Designation, length, quantity, totalWeight);
  
      setLength(1);
      setQuantity(1);
    }
  };
  const totalWeight = selectedOption ? 
  (parseFloat(selectedOption.Mass) * length * quantity).toFixed(2) : 0;

  return (
    <>
      <div className="input-group mb-2">
        <label className="input-group-text metalcalc" htmlFor="inputGroupSelect05">
        Designation Size
        </label>
        <select
          className="form-select"
          id="inputGroupSelect05"
          value={selectedOption?.Designation|| ""}
          onChange={handleChange} 
        >
        <option value="">-- Select --</option>
          {data.map((option, index) => (
          <option key={index} value={option.Designation}>
            {option.Designation}
        </option>
          ))}
        </select>
      </div>
      {selectedOption && (
        <div className="mt-2">
          <div className="input-group mb-2">  
            <NumericInput span="Length (m)" value={length} onChange={setLength} customWidth={150}/>
          </div>
          <div className="input-group mb-2">
            <label className="input-group-text metalcalc" htmlFor="inputGroupSelect07">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>
          <button className="btn btn-success" onClick={handleAddClick}>Add to Table</button>
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}><strong>Total Weight : </strong> 
          <span className="ms-2">{totalWeight} kg</span>
          </p>
        </div>
      )}
    </>
  );
};
//
const JsonDataTable = ({ data }) => {
  const { mode } = useContext(SchematicContext);
  if (!data) return null;

  const basicKeys = ['NB','OD','Designation', 'Mass', 'Area', 'Designation_Size', 'Weight', 'Area_of_Section'];
  const dimensionKeys = ['a','b','D', 'B', 't', 'T', 'R1', 'R2', 'Flange Slope','Slope','Depth_D_mm', 'Width_B_mm', 'Thickness_t_mm','Internal_Volume','Surface_External','Surface_Internal'];
  const allKeys = Object.keys(data);

  const basic = basicKeys.filter(key => allKeys.includes(key));
  const dimensions = dimensionKeys.filter(key => allKeys.includes(key));
  const others = allKeys.filter(
    key => !basic.includes(key) && !dimensions.includes(key)
  );

  const getRow = (keys) => keys.map(key => data[key] ?? '--');

  const tableClass = `table table-bordered text-${mode === 'light' ? 'dark' : 'light'}`;

  return (
    <>
      <div className="table-responsive mt-3">
        <h6 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>Designation / Mass / Area</h6>
        <table className={tableClass}>
          <thead>
            <tr>{basic.map(key => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            <tr>{getRow(basic).map((val, i) => <td key={i}>{val}</td>)}</tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive mt-3">
        <h6 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>Dimensions</h6>
        <table className={tableClass}>
          <thead>
            <tr>{dimensions.map(key => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            <tr>{getRow(dimensions).map((val, i) => <td key={i}>{val}</td>)}</tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive mt-3">
        <h6 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>Properties</h6>
        <table className={tableClass}>
          <thead>
            <tr>{others.map(key => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            <tr>{getRow(others).map((val, i) => <td key={i}>{val}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const MetalCalc = () => {
  const { mode } = useContext(SchematicContext);
  const tableRef = useRef();
  // State variables
  const [country, setCountry] = useState('1');
  const [mType, setMType] = useState('1');
  const [classification, setClassification] = useState('1');
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ designation: '', length: '', quantity: '' });

  const addRow = (row) => {
    const safeRow = {
      designation: String(row.designation),
      length: String(row.length),
      quantity: String(row.quantity),
      weight: (parseFloat(row.weight) || 0).toFixed(2),
    };
    const updatedRows = [...rows, safeRow];
    setRows(updatedRows);
    window.exportRows = updatedRows;
  };

  // Country dropdown component
  const renderCountryDropdown = () => (
    <>
      <label className="input-group-text metalcalc" htmlFor="inputGroupSelect01">
        Country standards
      </label>
      <select
        className="form-select"
        id="inputGroupSelect01"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        {Country.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );

  // Material dropdown component
  const renderMaterialDropdown = () => (
    <>
      <label className="input-group-text metalcalc" htmlFor="inputGroupSelect02">
        Material
      </label>
      <select
        className="form-select"
        id="inputGroupSelect02"
        value={mType}
        onChange={(e) => setMType(e.target.value)}
      >
        {MaterialType.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );

  // Classification dropdown based on material type
  const renderClassification = () => {
    if (mType === "1") {
      return (
        <>
          <label className="input-group-text metalcalc" htmlFor="inputGroupSelect04">
            Classification
          </label>
          <select
            className="form-select"
            id="inputGroupSelect04"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
          >
            {IndianHollowSectionClassification.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      );
    } else if (mType === "2") {
      return (
        <>
          <label className="input-group-text metalcalc" htmlFor="inputGroupSelect05">
            Classification
          </label>
          <select
            className="form-select"
            id="inputGroupSelect05"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
          >
            {IndianOpenSectionClassification.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      );
    }
    return null;
  };

const [selectedJson, setSelectedJson] = useState(null); // new state

  // Render shape inputs based on material type and classification.
  // For material type "1", we use various classifications;
  // For other material types, render the merged designation dropdown.
  const renderShapeInputs = () => {

    const handleSelection = (dataObj) => setSelectedJson(dataObj);
    const handleAdd = (designation, length, quantity, weight,fullData = null) => {
      addRow({ designation, length, quantity, weight });
      if (fullData) setSelectedJson(fullData);
    };
    
    if (mType === "1") {
      switch (classification) {
        case "1": //CHS
          return <DesignationDropdown data={CHS} onAdd={handleAdd} onSelect={handleSelection}/>;
        case "2": //SHS
          return <HollowSectionDesignationDropdown data={SHS} onAdd={handleAdd} onSelect={handleSelection}/>;
        case "3": //RHS
          return <HollowSectionDesignationDropdown data={RHS} onAdd={handleAdd} onSelect={handleSelection}/>;
        default:
          return null;
      }
    }
    else if (mType === "2") {
      // For open sections, use the selected classification to decide which JSON file's designations to list
      let designationData = [];
      if (classification === "1") {
        designationData = ISJB;
      } else if (classification === "2") {
        designationData = ISLB;
      }else if (classification === "3") {
        designationData = ISMB;
      }else if (classification === "4") {
        designationData = ISWB;
      }else if (classification === "5") {
        designationData = ISNPB;
      }else if (classification === "6") {
        designationData = ISWPB;
      }else if (classification === "7") {
        designationData = ISSC;
      }else if (classification === "8") {
        designationData = ISHB;
      }else if (classification === "9") {
        designationData = ISJC;
      }else if (classification === "10") {
        designationData = ISLC;
      }else if (classification === "11") {
        designationData = ISMC;
      }else if (classification === "12") {
        designationData = ISMPC;
      }else if (classification === "13") {
        designationData = ISELA;
      }else if (classification === "14") {
        designationData = ISUELA;
      }else if (classification === "15") {
        designationData = ISPFBP;
      }
      return <OpenSectionDesignationDropdown data={designationData} onAdd={handleAdd} onSelect={handleSelection}/>;
    }
    return null;
  };
  //Render svg images of steel profiles
const rendersvg = () => {
  const isDark = mode === 'light';

  // Shared config for Sloping Flange Beam
  const slopingFlangeBeam = { dark: SlopingFlangeBeamBlack, light: SlopingFlangeBeamWhite, width: 240 };
  const parallelFlangeBeam = { dark: ParallelFlangeBeamBlack, light: ParallelFlangeBeamWhite, width: 200 };
  const slopingFlangeChannel = { dark: SlopingFlangeChannelBlack, light: SlopingFlangeChannelWhite, width: 240 };
  const parallelFlangeChannel = { dark: ParallelFlangeChannelBlack, light: ParallelFlangeChannelWhite, width: 240};
  const equalLegAngles = { dark: EqualLegAnglesBlack, light: EqualLegAnglesWhite, width: 440 };
  const unequalLegAngles = { dark: UnequalLegAnglesBlack, light: UnequalLegAnglesWhite, width: 440 };

  // Open section mappings
  const openSectionImages = {
    "1": slopingFlangeBeam,
    "2": slopingFlangeBeam,
    "3": slopingFlangeBeam,
    "4": slopingFlangeBeam,
    "5": parallelFlangeBeam,
    "6": parallelFlangeBeam,
    "7": slopingFlangeBeam,
    "8": slopingFlangeBeam,
    "9": slopingFlangeChannel,
    "10": slopingFlangeChannel,
    "11": slopingFlangeChannel,
    "12": parallelFlangeChannel,
    "13": equalLegAngles,
    "14": unequalLegAngles,
    "15": parallelFlangeBeam,
  };

  // Hollow section mappings
  const hollowSectionImages = {
    "1": { dark: PipeBlack, light: PipeWhite, width: isDark ? 150 : 184 },
    "2": { dark: SqaureBlack, light: SqaureWhite, width: isDark ? undefined : 300 },
    "3": { dark: RectangleBlack, light: RectangleWhite, width: isDark ? undefined : 300 },
  };

  const sectionMap = mType === "2" ? openSectionImages : hollowSectionImages;
  const imageData = sectionMap[classification];

  if (!imageData) return null;

  return (
    <img
      src={isDark ? imageData.dark : imageData.light}
      className="metal-svg"
      width={imageData.width}
      alt=""
    />
  );
};
//Dynamic labelling for images
const getFigureLabel = (mType, classification) => {
  if (mType === "1") {
    const match = IndianHollowSectionClassification.find(item => item.value === classification);
    return match ? match.label : `Figure ${classification}`;
  } else if (mType === "2") {
    const match = IndianOpenSectionClassification.find(item => item.value === classification);
    return match ? match.label : `Figure ${classification}`;
  } else {
    return `Figure ${classification}`;
  }
};
const figureLabel = getFigureLabel(mType, classification);

  const handleEdit = (index) => {
    setEditData(rows[index]);
    setEditIndex(index);
  };

  const handleSave = () => {
    const updated = [...rows];
    const updatedRow = { ...editData };
    updatedRow.weight = (parseFloat(updatedRow.weight) || 0).toFixed(2);
    updated[editIndex] = updatedRow;
    setRows(updated);
    window.exportRows = updated;
    setEditIndex(null);
  };
  const totalWeight = rows.reduce((sum, row) => sum + parseFloat(row.weight || 0), 0).toFixed(2);

  return (
    <div className="container">
      <div className="row" data-bs-theme={mode}>
        <div className= "col-lg-4 sidebar-panel" style={{backgroundColor: mode === 'dark'?'#000000':'#EFF7FF'}}>
          <h1 className={`text-${mode === 'light' ? 'dark' : 'light'} my-4`}>
            Metal Weight Calculation
          </h1>
          <div className="input-group mb-2">{renderCountryDropdown()}</div>
          <div className="input-group mb-2">{renderMaterialDropdown()}</div>
          <div className="input-group mb-2">{renderClassification()}</div>
          <div className="my-3">
            <h2 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>
            Input Type
            </h2>
            <>{renderShapeInputs()}</>
          </div>
        </div>
        <div className="col-lg-8 my-4">
          <div className="d-flex justify-content-center align-items-center">{rendersvg()}</div>
          <p className={`d-flex justify-content-center text-${mode === 'light' ? 'dark' : 'light'}`}>Figure: {figureLabel}</p>
          <JsonDataTable data={selectedJson} />
          <div className='table-responsive'>
          <h5 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>Table</h5>
          <table ref={tableRef} className={`table table-sm table-${mode} table-bordered mt-3`}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Length (m)</th>
                <th>Quantity</th>
                <th>Weight (kg)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td colSpan={5} className="text-muted">--</td>
                  </tr>
                ))
              ) : (
                rows.map((row, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{row.designation}</td>
                    <td>{row.length}</td>
                    <td>{row.quantity}</td>
                    <td>{row.weight}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEdit(i)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => setRows(rows.filter((_, idx) => idx !== i))}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
          {rows.length > 0 && (
            <div className={`text-end text-${mode === 'light' ? 'dark' : 'light'}`}>
              <strong>Total Weight:</strong> {totalWeight} kg
            </div>
          )}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-success btn-sm" onClick={() => exportExcel()}>Export CSV</button>
            <button className="btn btn-danger btn-sm" onClick={() => exportExcel()}>Export PDF</button>
          </div>
          <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">Edit Entry</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control mb-2" placeholder="Designation" value={editData.designation} onChange={(e) => setEditData({ ...editData, designation: e.target.value })} />
                  <input type="text" className="form-control mb-2" placeholder="Length" value={editData.length} onChange={(e) => setEditData({ ...editData, length: e.target.value })} />
                  <input type="text" className="form-control mb-2" placeholder="Quantity" value={editData.quantity} onChange={(e) => setEditData({ ...editData, quantity: e.target.value })} />
                  <input type="text" className="form-control mb-2" placeholder="Weight" value={editData.weight} onChange={(e) => setEditData({ ...editData, weight: e.target.value })} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>Save changes</button>
                </div>
          </div>
          </div>
        </div>
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex mt-4`}>Steel is the most important metal used in the construction industry due to their strength, durability, and versatility. Accurately estimating the quantities of these metals is essential for efficient planning, cost management, and resource optimization in building projects.</p>
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}>
            Our Metal Weight Calculator simplifies this process by providing precise weight calculations based on the dimensions and density of steel and aluminum components.
          </p>
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}>
            The formula used to calculate metal weight is: Weight = Volume × Density
          </p>
          <h3 className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}>
            Why is Calculating Metal Weight Important?
          </h3>
          <ol className={`text-${mode === 'light' ? 'dark' : 'light'}`}>
            <li className="mb-3">
              <p className="fw-bold">Cost Estimation :</p>
              The price of raw materials is often calculated per unit weight. Knowing the metal's weight helps in budgeting and ensures cost-effective purchasing.
            </li>
            <li className="mb-3">
              <p className="fw-bold">Mobility :</p>
              Heavy metal objects require machinery for lifting and handling. Understanding the weight is crucial to ensure the equipment used can safely manage the load.
            </li>
            <li className="mb-3">
              <p className="fw-bold">Shipping Costs :</p>
              Transportation costs depend on the weight of the shipment. Accurate weight estimation helps in determining shipping costs and avoiding unexpected expenses.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const exportExcel = () => {
  const header = ['Item', 'Description', 'Length (m)', 'Quantity', 'Weight (kg)'];
  const data = window.exportRows?.map((row, i) => [
    i + 1,
    row.designation,
    row.length,
    row.quantity,
    row.weight,
  ]) || [];

  // Dependency-free CSV export — opens directly in Excel / Google Sheets.
  // Fields containing commas, quotes or newlines are quoted per RFC 4180.
  const escape = (v) => {
    const s = String(v ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [header, ...data].map((row) => row.map(escape).join(',')).join('\r\n');
  // UTF-8 BOM so Excel reads accented characters correctly.
  const blob = new Blob([String.fromCharCode(0xFEFF) + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'metal_calculation.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default MetalCalc;

