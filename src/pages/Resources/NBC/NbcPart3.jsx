import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part3 from '../../../assets/NBC/NBCPart3.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart3 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
      <h2 className={`${textColorClass} mb-4`}>Part 3 - Development Control Rules and General Building Requirements</h2> 
      <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part covers development control rules such as land use classification, requirements
          for subdivision and layout plan including means of access, open spaces, plot requirements,
          area and height limitations, off street parking spaces, green belts and landscaping. This Part
          also covers general building requirements for various parts of building and accessibility
          requirements in the built environment.
        </p>
        </div>
      </div>
      <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart2'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart2'>2</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart4'>3</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart4'>4</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart4'>Next</Link></li>
        </ul>
        </nav> 
        <PDFViewer name={Part3}/>
      </div>     
    </div>
  )
}

export default NbcPart3