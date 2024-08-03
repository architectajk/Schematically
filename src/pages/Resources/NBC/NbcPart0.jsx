import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part0 from '../../../assets/NBC/NBCPart0.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart0 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className=' container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>PART 0 - Prerequisite  for  Applying  Provisions  of  the  Code</h2>
        <div className='row'>
          <div className=' col-md-6'>
        <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
        <p className={`${textColorClass} mb-4`}>This Part gives an overall direction for practical applications of different aspects of spatial
            planning, designing and construction of buildings, and laying of services. It proposes
            an integrated approach for utilizing appropriate knowledge and experience of qualified
            professionals during the entire life cycle of a development/building project.
        </p>
        </div>
        <div className=' col-md-6'>
        <h3 className={`${textColorClass} mb-4`}>Part 0 at a glance</h3>
        <p className={`${textColorClass} mb-4`}>A development/building project and the built facility comprises 6 major stages.
        </p>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled"><Link class="page-link" to='/resources/NBC/NBCPart0'>Previous</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart0'>0</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart1'>1</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart2'>2</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart1'>Next</Link></li>
        </ul>
        </nav>
        </div>  
        <PDFViewer name={Part0}/>
      </div>     
    </div>
  )
}

export default NbcPart0


