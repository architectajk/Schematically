import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part6 from '../../../assets/NBC/NBCPart6.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart6 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 6 - Structural Design</h2> 
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part provides for structural adequacy of buildings and usage of materials and technology
          for building design. It is divided into 8 Sections (Section 1 to Section 8).
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart5'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart5'>5</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart5'>6</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart7'>7</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart7'>Next</Link></li>
        </ul>
        </nav>  
        <PDFViewer name={Part6}/>
      </div>     
    </div>
  )
}

export default NbcPart6