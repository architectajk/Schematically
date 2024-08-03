import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part4 from '../../../assets/NBC/NBCPart4.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart4 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <div>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 4 - Fire and Life Safety</h2> 
        <div className='row'>
        <div className=' col-md-8'>
          <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
          <p className={`${textColorClass} mb-4`}>This Part deals with safety from fire. It specifies the demarcation of fire zones, restrictions on
          construction of buildings in each fire zone, classification of buildings based on occupancy,
          types of building construction according to fire resistance of the structural and non-structural
          components and other restrictions and requirements necessary to minimize danger to life
          from fire, smoke, fumes or panic before the buildings can be evacuated. The provisions covered
          in this Part are divided in three broad areas: Fire Prevention, Life Safety and Fire Protection.
          </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart3'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart3'>3</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart4'>4</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart5'>5</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart5'>Next</Link></li>
        </ul>
        </nav> 
        <PDFViewer name={Part4}/>
      </div>     
    </div>
  )
}

export default NbcPart4