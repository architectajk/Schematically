import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part2 from '../../../assets/NBC/NBCPart2.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart2 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 2 - Administration</h2>
        <div className='row'>
          <div className=' col-md-8'>
        <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
        <p className={`${textColorClass} mb-4`}>This Part describes organization of a building department for enforcement of the Code including
        procedure for obtaining development, building and occupancy permits; responsibility of the
        owner and all professionals involved in planning, design and construction of the building.
        </p>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart1'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart1'>1</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart2'>2</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart3'>3</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart3'>Next</Link></li>
        </ul>
        </nav>
        </div>  
        <PDFViewer name={Part2}/>
      </div>     
    </div>
  )
}

export default NbcPart2