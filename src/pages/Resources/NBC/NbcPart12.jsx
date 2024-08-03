import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part12 from '../../../assets/NBC/NBCPart12.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart12 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 12 - Asset and Facility Management</h2> 
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part covers provisions relating to management of building assets and associated facilities,
            such as building and building services. It also covers responsibility of facility managers and of
            occupants for maintenance of facilities, such as structures, equipment and exterior property.
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart11'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart10'>10</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart11'>11</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart12'>12</Link></li>
          <li class="page-item disabled"><Link class="page-link" to='/resources/NBC/NBCPart12'>Next</Link></li>
        </ul>
        </nav> 
        <PDFViewer name={Part12}/>
      </div>     
    </div>
  )
}

export default NbcPart12