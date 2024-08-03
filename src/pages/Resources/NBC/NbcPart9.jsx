import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part9 from '../../../assets/NBC/NBCPart9.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart9 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 9 - Plumbing Services & Solid Waste Management</h2>  
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part has 4 Sections; for water supply, drainage and sanitation, solid waste management
            and gas supply. All buildings meant for human habitation shall be provided with potable
            water supply and adequate sanitary facilities.
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart8'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart8'>8</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart9'>9</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart10'>10</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart10'>Next</Link></li>
        </ul>
        </nav>
        <PDFViewer name={Part9}/>
      </div>     
    </div>
  )
}

export default NbcPart9