import React, { useContext, useState} from 'react';
import NumericInput from '../SanReq/NumericInput';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import '../../../assets/CSS/MetalCalc.css';
import ISJB from '../MetalCalc/ISJB.json';
import ISLB from '../MetalCalc/ISLB.json';
import CHS from '../MetalCalc/ISCircularHollowSections.json';
import SHS from '../MetalCalc/ISSquareHollowSections.json';
import RHS from '../MetalCalc/ISRectangleHollowSections.json';
import { ReactComponent as SFB} from '../../../assets/Metal/Asset 2.svg'
import { ReactComponent as PFB} from '../../../assets/Metal/Asset 3.svg'
import { ReactComponent as SqaureBlack} from '../../../assets/Metal/SHS_Black.svg'
import { ReactComponent as RectangleBlack} from '../../../assets/Metal/RHS_Black.svg'
import { ReactComponent as PipeBlack} from '../../../assets/Metal/CHS_Black.svg'
import SqaureWhite from '../../../assets/Metal/SHS_White.png'
import RectangleWhite from '../../../assets/Metal/RHS_White.png'
import PipeWhite from '../../../assets/Metal/CHS_White.png'
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import { useRef } from 'react';

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
  { value: '1', label: 'Junior beams (ISJB)' },
  { value: '2', label: 'Light weight beams (ISLB)' },
  { value: '3', label: 'Medium weight beams (ISMB)' },
  { value: '4', label: 'Wide flange beams (ISWB)' },
  { value: '5', label: 'Narrow parallel flange beams (ISNPB)' },
  { value: '6', label: 'Wide parallel flange beams (ISWPB)' },
  { value: '7', label: 'Column sections (ISSC)' },
  { value: '8', label: 'Heavy weight beam (ISHB)' },
  { value: '9', label: 'Junior channels (ISJC)' },
  { value: '10', label: 'Light weight channels (ISLC)' },
  { value: '11', label: 'Medium weight channels (ISMC)' },
  { value: '12', label: 'Medium weight parallel flange channels (ISMPC)' },
  { value: '13', label: 'Equal leg angles (ISA)' },
  { value: '14', label: 'Unequal leg angles (ISA)' },
  { value: '15', label: 'Parallel flange bearing piles (ISPBP)' },
];

const IndianHollowSectionClassification = [
  { value: '1', label: 'Pipe (CHS)' },
  { value: '2', label: 'Sqaure Profile (SHS)' },
  { value: '3', label: 'Rectangle Profile (RHS)' },
];

// DesignationDropdown component that accepts data as a prop
//CHS
const DesignationDropdown = ({ data, onAdd }) => {
  const { mode } = useContext(SchematicContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [length, setLength] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const [nb, thickness] = e.target.value.split('|');
    const matchedOption = data.find(item => 
      String(item.NB) === nb && String(item.Thickness) === thickness
    );
    setSelectedOption(matchedOption || null);
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
          value={selectedOption ? `${selectedOption.NB}|${selectedOption.Thickness}` : ""}
          onChange={handleChange}
        >
        <option value="">-- Select --</option>
        {data.map((option, index) => (
          <option key={index} value={`${option.NB}|${option.Thickness}`}>
            {option.NB} (OD: {option.OD}, Thickness: {option.Thickness})
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
const HollowSectionDesignationDropdown = ({ data, onAdd  }) => {
  const { mode } = useContext(SchematicContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [length, setLength] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const selected = data.find(option => option.Designation_Size === e.target.value);
    setSelectedOption(selected || null);
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

  // Render shape inputs based on material type and classification.
  // For material type "1", we use various classifications;
  // For other material types, render the merged designation dropdown.
  const renderShapeInputs = () => {

    const handleAdd = (designation, length, quantity, weight) => {
      addRow({ designation, length, quantity, weight });
    };
    
    if (mType === "1") {
      switch (classification) {
        case "1": //CHS
          return <DesignationDropdown data={CHS} onAdd={handleAdd}/>;
        case "2": //SHS
          return <HollowSectionDesignationDropdown data={SHS} onAdd={handleAdd}/>;
        case "3": //RHS
          return <HollowSectionDesignationDropdown data={RHS} onAdd={handleAdd}/>;
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
      }
      return <DesignationDropdown data={designationData} />;
    }
    return null;
  };
  //Render svg images of steel profiles
  const rendersvg = () => {
    const isDark = mode === 'light';
  
    if (mType === "2") {
      // Open sections
      switch (classification) {
        case "1":
          return <SFB width={300} height={300} />;
        case "2":
          return <PFB width={300} height={300} />;
        default:
          return null;
      }
    } else {
      // Hollow sections
      switch (classification) {
        case "1":
          return isDark ?(
         <PipeBlack width={300} />):(<img src={PipeWhite} width={300} alt=''/>);
        case "2":
          return isDark ? (
            <SqaureBlack width={300}  />
          ) : (
            <img src={SqaureWhite} width={300} alt=''/>
          );
        case "3":
          return isDark ? (
            <RectangleBlack width={300} height={300} />
          ) : (
            <img src={RectangleWhite} width={300} alt=''/>
          );
        default:
          return null;
      }
    }
  }
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

  const exportPDF = () => {
    const element = tableRef.current;
    const opt = {
      margin:       0.5,
      filename:     'metal_table.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };
  return (
    <div className="container">
      <div className="row" data-bs-theme={mode}>
        <div className="col-lg-4">
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
          <div className="d-flex justify-content-center align-items-center">{rendersvg()}
            <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex d-`}>Figure</p>
          </div>
          <table ref={tableRef} className={`table table-${mode} table-bordered mt-3`}>
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

          {rows.length > 0 && (
            <div className={`text-end text-${mode === 'light' ? 'dark' : 'light'}`}>
              <strong>Total Weight:</strong> {totalWeight} kg
            </div>
          )}
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-success btn-sm" onClick={() => exportExcel()}>Export Excel</button>
            <button className="btn btn-danger btn-sm" onClick={exportPDF}>Export PDF</button>
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
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} d-flex`}>Steel is the most important metal used in the construction industry due to their strength, durability, and versatility. Accurately estimating the quantities of these metals is essential for efficient planning, cost management, and resource optimization in building projects.</p>
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

  const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MetalCalc');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'metal_calculation.xlsx');
};

export default MetalCalc;

