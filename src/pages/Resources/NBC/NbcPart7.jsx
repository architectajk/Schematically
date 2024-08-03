import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part7 from '../../../assets/NBC/NBCPart7.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart7 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 7 - Construction Management, Practices and Safety</h2> 
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part covers construction project management, construction planning, site management
              and building construction practices, storage, stacking and handling of materials. It also deals
              with safety of personnel during construction operations, demolition of buildings, habitat
              and welfare requirements for workers. The guidelines relating to repairs, retrofitting and
              strengthening of buildings are covered under this Part.
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart6'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart6'>6</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart7'>7</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart8'>8</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart8'>Next</Link></li>
        </ul>
        </nav> 
        <PDFViewer name={Part7}/>
      </div>     
    </div>
  )
}

export default NbcPart7