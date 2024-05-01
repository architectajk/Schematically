import React,{useState,useContext} from 'react'
import NumericInput from '../SanReq/NumericInput';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';

const ScaleCalc = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1,setInputValue1] = useState(1);
  const [inputValue2,setInputValue2] = useState(1);
  const [originalValue, setOriginalValue] = useState('');
  const [originalUnit, setOriginalUnit] = useState('m');
  const [convertedValue, setConvertedValue] = useState('');
  const [convertedUnit, setConvertedUnit] = useState('cm');

  const UnitsTypes=[
    { value: 'mm', label: 'Millimeters' },
    { value: 'cm', label: 'Centimeters' },
    { value: 'm', label: 'Meters' },
    { value: 'km', label: 'Kilometers' },
    { value: 'in', label: 'Inches' },
    { value: 'ft', label: 'Feet' },
    { value: 'yd', label: 'Yards' },
    { value: 'mi', label: 'Miles' },
    { value: 'μm', label: 'Micrometers'},
  ];

  if (isNaN(originalValue)) {
    setConvertedValue('');
    return;
  }
  const convertLength = () => {
    
    const ratio = inputValue1/inputValue2;

    const conversionFactors = {
      mm: 1000,
      cm: 100,
      m: 1,
      km: 0.001,
      in: 39.3701,
      ft: 3.2808,
      yd: 1.09361,
      mi: 0.000621371,
      μm: 1000000
    };  

    const Converted = (ratio * originalValue / conversionFactors[originalUnit]) * conversionFactors[convertedUnit];
    setConvertedValue(Converted.toFixed(4));
  };

  return (
    <div className='d-flex-column col-md-6' data-bs-theme={mode}>
      <h1 className={`text-${mode==='light'?'dark':'light'} d-flex my-4`}>Scale Calculator</h1>
      <div className="input-group mb-3">
        <NumericInput span="Scale" value={inputValue1} onChange={setInputValue1}/>
        <NumericInput span=":" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="input-group mb-3">
        <NumericInput span="Original size" value={originalValue} onChange={setOriginalValue}/>
        <select className="form-select" id="inputGroupSelect01" value={originalUnit} onChange={(e) => setOriginalUnit(e.target.value)}>
        {UnitsTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            ))}
        </select>
      </div>
      <div className="input-group input-group-lg mb-3">
        <NumericInput span="Scaled size" id="inputGroup-sizing-lg"  value={convertedValue}  aria-label="readonly input" readOnly/>
        <select className="form-select" id="inputGroupSelect02"  value={convertedUnit} onChange={(e) => setConvertedUnit(e.target.value)}>
        {UnitsTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            ))}
        </select>
      </div>
      <div>
      <button className="btn btn-primary" onClick={convertLength}>Convert</button>
      </div>
    </div>
  )
}

export default ScaleCalc
