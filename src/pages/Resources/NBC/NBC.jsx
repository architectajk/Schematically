import React,{useState,useEffect,useContext} from 'react';
import Part0 from '../../../assets/NBC/NBCPart0.pdf';
import Part1 from '../../../assets/NBC/NBCPart1.pdf';
import P1 from "../../../assets/NBC/Part1.svg";
import Part2 from '../../../assets/NBC/NBCPart2.pdf';
import P2 from '../../../assets/NBC/Part2.svg'
import Part3 from '../../../assets/NBC/NBCPart3.pdf';
import P3 from '../../../assets/NBC/Part3.svg';
import Part4 from '../../../assets/NBC/NBCPart4.pdf';
import P4 from '../../../assets/NBC/Part4.svg'
import Part5 from '../../../assets/NBC/NBCPart5.pdf';
import P5 from '../../../assets/NBC/Part5.svg';
import Part6 from '../../../assets/NBC/NBCPart6.pdf';
import P6 from '../../../assets/NBC/Part6.svg';
import Part7 from '../../../assets/NBC/NBCPart7.pdf';
import P7 from '../../../assets/NBC/Part7.svg';
import Part8 from '../../../assets/NBC/NBCPart8.pdf';
import P8 from '../../../assets/NBC/Part8.svg';
import Part9 from '../../../assets/NBC/NBCPart9.pdf';
import P9 from '../../../assets/NBC/Part9.svg';
import Part10 from '../../../assets/NBC/NBCPart10.pdf';
import P10 from '../../../assets/NBC/Part10.svg';
import Part11 from '../../../assets/NBC/NBCPart11.pdf';
import P11 from '../../../assets/NBC/Part11.svg';
import Part12 from '../../../assets/NBC/NBCPart12.pdf';
import P12 from '../../../assets/NBC/Part12.svg';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

    
export default function NBC() {
  const {mode} = useContext(SchematicContext);

  const options = ["PART 0 - Prerequisite  for  Applying  Provisions  of  the  Code",
  "PART 1 - Definitions","PART 2 - Administration",
  "PART 3 - Development  Control  Rules  and  General  Building  Requirements", 
  "PART 4 - Fire  and  Life  Safety", 
  "PART 5 - Building  Materials", 
  "PART 6 - Structural  Design",
  "PART 7 - Construction  Management,  Practices  and  Safety",
  "PART 8 - Building  Services",
  "PART 9 - Plumbing  Services", 
  "PART 10 - Landscape  Development,  Signs  and  Outdoor  Display  Structures", 
  "PART 11 - Approach  to  Sustainability", 
  "PART 12 - Asset  and  Facility  Management"];
  
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [pdfData, setPdfData] = useState(Part0);

  useEffect(()=>{
    // Fetch additional data or perform side effects when selectedOption changes
    switch(selectedOption){
      case "PART 0 - Prerequisite  for  Applying  Provisions  of  the  Code":
        setPdfData(Part0);
        break;
      case "PART 1 - Definitions":
        setPdfData(Part1);
        break;
      case "PART 2 - Administration":
        setPdfData(Part2);
        break;
      case "PART 3 - Development  Control  Rules  and  General  Building  Requirements":
        setPdfData(Part3);
        break;
      case "PART 4 - Fire  and  Life  Safety":
        setPdfData(Part4);
        break;
      case "PART 5 - Building  Materials":
        setPdfData(Part5);
        break;
      case "PART 6 - Structural  Design":
        setPdfData(Part6);
        break;
      case "PART 7 - Construction  Management,  Practices  and  Safety":
        setPdfData(Part7);
        break;
      case "PART 8 - Building  Services":
        setPdfData(Part8);
        break;
      case "PART 9 - Plumbing  Services":
        setPdfData(Part9);
        break;
      case "PART 10 - Landscape  Development,  Signs  and  Outdoor  Display  Structures":
        setPdfData(Part10);
        break;
      case "PART 11 - Approach  to  Sustainability":
        setPdfData(Part11);
        break;
      case "PART 12 - Asset  and  Facility  Management":
        setPdfData(Part12);
        break;
      default:
        setPdfData(null);
        break;
    }
   }, [selectedOption]); // Dependency array ensures the effect runs when selectedOption changes

   const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h1 className={`text-${mode === 'light' ? 'dark' : 'light'} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
      <div className="ms-md-auto">
        <div className="col-lg-6 my-4">
        <div className="input-group" data-bs-theme={mode}>
          <label className="input-group-text" htmlFor="inputGroupSelect01">NBC</label>
          <select className="form-select" id="inputGroupSelect01" onChange={handleOptionChange}>
            {options.map((option) => (
            <option key={option} value={option}>{option}</option>
            ))}
          </select>
          </div>
        </div>
      </div>
      <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P1" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <img src={P1} className='img-fluid' width={80} alt="" />
             <h5 className="card-title">Part 1</h5>
             <p className="card-text">Definition</p>
           </div>
         </div>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P2" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P2} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 2</h5>
            <p className="card-text">Administration</p>
           </div>
         </div>
       </div>  
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P3" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P3} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 3</h5>
            <p className="card-text">Development Control Rules and General Building Requirements</p>
           </div>
         </div>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P4" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P4} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 4</h5>
            <p className="card-text">Fire and Life Safety</p>
           </div>
         </div>
       </div>
     </div>
     <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P5" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <img src={P5} className='img-fluid' width={100} alt="" />
             <h5 className="card-title">Part 5</h5>
             <p className="card-text">Building Materials</p>
           </div>
         </div>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P6" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P6} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 6</h5>
            <p className="card-text">Structural Design</p>
           </div>
         </div>
       </div>  
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P7" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P7} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 7</h5>
            <p className="card-text">Construction Management, Practices and Safety</p>
           </div>
         </div>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P8" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P8} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 8</h5>
            <p className="card-text">Building Services</p>
           </div>
         </div>
       </div>
     </div>
     <div className="row mb-4" data-bs-theme={mode}>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P9" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
             <img src={P9} className='img-fluid' width={100} alt="" />
             <h5 className="card-title">Part 9</h5>
             <p className="card-text">Plumbing Services (including Solid Waste Management)</p>
           </div>
         </div>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P10" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P10} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 10</h5>
            <p className="card-text">Landscape Development,Signs and Outdoor Display Structures</p>
           </div>
         </div>
       </div>  
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P11" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P11} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 11</h5>
            <p className="card-text">Approach to Sustainability</p>
           </div>
         </div>
       </div>
       <div className="col-sm-3 mb-3 mb-sm-0">
         <div id="P12" className={`card text-center card-${mode} h-100`}>
           <div className="card-body">
            <img src={P12} className='img-fluid' width={100} alt="" />
            <h5 className="card-title">Part 12</h5>
            <p className="card-text">Asset and Facility Management</p>
           </div>
         </div>
       </div>
     </div>
        <div>
          <PDFViewer name={pdfData}/>
        </div>
      </div>
  )
}
