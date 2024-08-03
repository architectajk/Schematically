import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part10 from '../../../assets/NBC/NBCPart10.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart10 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className=' container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 10 - Landscape Development,Signs and Outdoor Display Structures</h2> 
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part covers provisions related to landscape planning, design and development and the
            requirements of signs and outdoor display structures with regard to public safety, structural
            safety and fire safety. It is divided into following two Sections:
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart9'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart9'>9</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart10'>10</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart11'>11</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart11'>Next</Link></li>
        </ul>
        </nav> 
        <PDFViewer name={Part10}/>
      </div>     
    </div>
  )
}

export default NbcPart10