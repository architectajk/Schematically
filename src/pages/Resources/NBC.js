import React,{useState,useEffect,useContext} from 'react'
import Part0 from '../../assets/NBC/NBCPart0.pdf'
import Part1 from '../../assets/NBC/NBCPart1.pdf'
import Part2 from '../../assets/NBC/NBCPart2.pdf'
import Part3 from '../../assets/NBC/NBCPart3.pdf'
import Part4 from '../../assets/NBC/NBCPart4.pdf'
import Part5 from '../../assets/NBC/NBCPart5.pdf'
import Part6 from '../../assets/NBC/NBCPart6.pdf'
import Part7 from '../../assets/NBC/NBCPart7.pdf'
import Part8 from '../../assets/NBC/NBCPart8.pdf'
import Part9 from '../../assets/NBC/NBCPart9.pdf'
import Part10 from '../../assets/NBC/NBCPart10.pdf'
import Part11 from '../../assets/NBC/NBCPart11.pdf'
import Part12 from '../../assets/NBC/NBCPart12.pdf'
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import {FaStream} from 'react-icons/fa'
import PDFViewer from '../../components/PDFViewer';
import '../../assets/CSS/NBC.css'
    
export default function NBC() {
  const {mode} = useContext(SchematicContext);
  const options = ["PART 0","PART 1","PART 2","PART 3", "PART 4", "PART 5", "PART 6", "PART 7", "PART 8", "PART 9", "PART 10", "PART 11", "PART 12"];
  const btnradio = ["btnradio1", "btnradio2",  "btnradio3",  "btnradio4",  "btnradio5",  "btnradio6", "btnradio7", "btnradio8", "btnradio9", "btnradio10", "btnradio11", "btnradio12", "btnradio13"]
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [pdfData, setPdfData] = useState(Part0);

  useEffect(()=>{
    // Fetch additional data or perform side effects when selectedOption changes
    switch(selectedOption){
      case "PART 0":
        setPdfData(Part0);
        break;
      case "PART 1":
        setPdfData(Part1);
        break;
      case "PART 2":
        setPdfData(Part2);
        break;
      case "PART 3":
        setPdfData(Part3);
        break;
      case "PART 4":
        setPdfData(Part4);
        break;
      case "PART 5":
        setPdfData(Part5);
        break;
      case "PART 6":
        setPdfData(Part6);
        break;
      case "PART 7":
        setPdfData(Part7);
        break;
      case "PART 8":
        setPdfData(Part8);
        break;
      case "PART 9":
        setPdfData(Part9);
        break;
      case "PART 10":
        setPdfData(Part10);
        break;
      case "PART 11":
        setPdfData(Part11);
        break;
      case "PART 12":
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
    <div className="main-container d-flex">
      <div className='sidebar' id='side_nav'>
        <div className='header-box px-2 pt-3 pb-4'>
          <h1 className="fs-4"><span className={`text-${mode === 'light' ? 'dark' : 'light'}`}>Contents</span></h1>
          <button className='btn d-md-none d-block close-btn px-1 py-0 text-white'><FaStream/></button>
        </div>
        <div className='btn-group-vertical' role="group" aria-label="Vertical button group">
          {options.map((option, index) => (
            <div className='py-1' key={option}>
              <input type="radio" className="btn-check" name="btnradio" autoComplete="off" id={btnradio[index]} value={option} checked={selectedOption === option} onChange={handleOptionChange}/>
              <label className={`text-${mode === 'light' ? 'dark' : 'light'} btn btn-outline-primary`} htmlFor={btnradio[index]}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={`text-${mode === 'light' ? 'dark' : 'light'} container main mx-4`}>
        <h1 className={`text-${mode === 'light' ? 'dark' : 'light'} d-inline-flex px-2 pt-3 pb-4 `}>National Building Code of India (2016)</h1>
          <div className='container'>
            <PDFViewer name={pdfData}/>
          </div>
      </div>
  </div>
  )
}
