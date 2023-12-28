import React,{useContext, useState, useEffect} from 'react'
import NumericInput from '../SanReq/NumericInput';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider'

const MaterialType= [
  {value:'1', label:'Aluminium'},
  {value:'2', label:'Steel'},
  {value:'3', label:'Others'},
];

const SteelType=[
  {value:'1', label:'Tool steel (7715 kg/m³)', density:7715},
  {value:'2', label:'Wrought iron (7750 kg/m³)', density:7750},
  {value:'3', label:'Carbon tool steel (7820 kg/m³)',density:7820},
  {value:'4', label:'Cold-drawn steel (7830 kg/m³)',density:7830},
  {value:'5', label:'Carbon steel (7840 kg/m³)',density:7840},
  {value:'6', label:'C1020 HR steel (7850 kg/m³)',density:7850},
  {value:'7', label:'Pure Iron (7860 kg/m³)',density:7860},
  {value:'8', label:'Mild steel (7870 kg/m³)',density:7870},
  {value:'9', label:'Stainless steel (8030 kg/m³)',density:8030},
];

const AluminiumType=[
  {value:'1',label:'Aluminum (average)(2700 kg/m³)',density:2700},
  {value:'2',label:'Melted aluminum (2600 kg/m³)',density:2600},
  {value:'3',label:'Aluminum 1050 (2710 kg/m³)',density:2710},
  {value:'4',label:'Aluminum 1100 (2720 kg/m³)',density:2720},
  {value:'5',label:'Aluminum 3103 (2730 kg/m³)',density:2730},
  {value:'6',label:'Aluminum 5005 (2700 kg/m³)',density:2700},
  {value:'7',label:'Aluminum 5083 (2650 kg/m³)',density:2650},
  {value:'8',label:'Aluminum 5215-5454 (2690 kg/m³)',density:2690},
  {value:'9',label:'Aluminum 5754 (2660 kg/m³)',density:2660},
  {value:'10',label:'Aluminum 6005-6082 (2700 kg/m³)',density:2700},
  {value:'11',label:'Aluminum 7075 (2800 kg/m³)',density:2800},
];
const Shape=[
  {value:'1',label:'Pipe'},
  {value:'2',label:'Sheet'},
];

const MetalCalc = () => {
    const {mode} = useContext(SchematicContext);

    const[mType,setMType]=useState('2');
    const[alloyType,setAlloyType]=useState('8')
    const[shape,setShape]=useState('1')
    const[inputDensity,setInputDensity]=useState('7800')
    const[inputValue1,setInputValue1]=useState(0)
    const[inputValue2,setInputValue2]=useState(0)
    const[inputValue3,setInputValue3]=useState(0)

    const getDensity = () => {
      // Find the selected alloy type object
      switch(mType){
        case "1":
          const aluminumAlloy = AluminiumType.find((alloy) => alloy.value === alloyType);
          return aluminumAlloy ? aluminumAlloy.density : null;
        case "2":
          const steelAlloy = SteelType.find((alloy) => alloy.value === alloyType);
          return steelAlloy ? steelAlloy.density : null;
        case "3":
          return inputDensity
        default:
          return null;
    };}

    const Pipe = () => {
      let dia = inputValue1;
      let thickness = inputValue2;
      let area = (Math.PI/4)*((dia**2)-((dia-(2*thickness))**2))
      let length = inputValue3;
      let weight = area* length* getDensity();
      return weight.toFixed(2);
    };
    const Sheet = () => {
      let length = inputValue1;
      let width = inputValue2;
      let thickness = inputValue3;
      let weight = length * width * thickness* getDensity();
      return weight;
    };

    const selectedAlloyType=()=>{
      switch(mType){
        case "1":
          return <>
          <label className="input-group-text" htmlFor="inputGroupSelect02">Type of Alloy</label>
          <select className="form-select" id="inputGroupSelect02" value={alloyType} onChange={(e)=>setAlloyType(e.target.value)}>
          {AluminiumType.map((option) => (
              <option key={option.value} value={option.value} >
                {option.label}
              </option>
              ))}
          </select></>
        case "2":
          return <>
          <label className="input-group-text" htmlFor="inputGroupSelect02">Type of Alloy</label>
          <select className="form-select" id="inputGroupSelect02" value={alloyType} onChange={(e)=>setAlloyType(e.target.value)}>
          {SteelType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
              ))}
          </select></>
        case "3":
          return <NumericInput span="Density of Metal (kg/m³)" value={inputDensity} onChange={setInputDensity}/>
        default:
          return SteelType;
      }
    };
    
    useEffect(() => {
      // Handle visibility logic for components here
    }, [mType]);

    const selectedShape = () => {
      switch (shape) {
        case "1":
          return (
            <>
            <div className="input-group mb-2 ">
              <NumericInput span="Diameter" value={inputValue1} onChange={setInputValue1}/>
            </div>
            <div className="input-group mb-2 ">
              <NumericInput span="Thickness" value={inputValue2} onChange={setInputValue2}/>
            </div>
            <div className="input-group mb-2 ">
              <NumericInput span="Length" value={inputValue3} onChange={setInputValue3}/>
            </div>
            <div className="input-group mb-2 ">
              <NumericInput span="Weight" value={Pipe()} readOnly />
            </div>
            </>
          );
          case "2":
            return (
              <>
              <div className="input-group mb-2">
                <NumericInput span="Length"value={inputValue1} onChange={setInputValue1}/>
              </div>
              <div className="input-group mb-2">
                <NumericInput span="Width" value={inputValue2} onChange={setInputValue2}/>
              </div>
              <div className="input-group mb-2">
                <NumericInput span="Thickness" value={inputValue3} onChange={setInputValue3}/>
              </div>
              <div className="input-group mb-2">
                <NumericInput span="Weight" value={Sheet()} readOnly />
              </div>
              </>
            );
        default:
          return;
      }
    };
  return (
    <div className='container'>
    <div className='row' data-bs-theme={mode}>
      <div className="col-lg-4">
        <h1 className={`text-${mode==='light'?'dark':'light'} my-4`}>Metal Weight Calculation</h1>
        <div className="input-group mb-2 ">
          <label className="input-group-text" htmlFor="inputGroupSelect01">Select Material</label>
          <select className="form-select" id="inputGroupSelect01" value={mType} onChange={(e)=>setMType(e.target.value)}>
          {MaterialType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
              ))}
          </select>
        </div>
        <div className="input-group mb-2 ">
          {selectedAlloyType()}
        </div>
        <div className="input-group mb-2 ">
          <label className="input-group-text" htmlFor="inputGroupSelect02">Shape</label>
          <select className="form-select" id="inputGroupSelect02" value={shape} onChange={(e)=>setShape(e.target.value)}>
          {Shape.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
              ))}
          </select>
        </div>
        <div className="my-4">
          {selectedShape()}
        </div>
      </div>
      <div className="col-lg-8 my-4 ">
      <p className={`text-${mode==='light'?'dark':'light'} d-flex`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At maxime vel aperiam maiores quo mollitia distinctio aliquam neque perferendis obcaecati nemo error autem, tempore fugit quos! Maxime ducimus aliquid ut.</p>
      </div>
    </div>
    </div>
  )
}

export default MetalCalc
