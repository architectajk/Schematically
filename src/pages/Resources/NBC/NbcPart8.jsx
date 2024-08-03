import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part8 from '../../../assets/NBC/NBCPart8.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart8 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 8 - Building Services</h2>  
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>All buildings meant for human habitation must be provided with adequate building services.
          This Part prescribes requirements for building services, and is divided into 6 Sections.
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart7'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart7'>7</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart8'>8</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart9'>9</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart9'>Next</Link></li>
        </ul>
        </nav> 
        <PDFViewer name={Part8}/>
      </div>     
    </div>
  )
}

export default NbcPart8