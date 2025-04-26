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
        <div className='col-md-6 mb-4'>
        <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
        <p className={`${textColorClass}`}>This Part gives an overall direction for practical applications of different aspects of spatial
            planning, designing and construction of buildings, and laying of services. It proposes
            an integrated approach for utilizing appropriate knowledge and experience of qualified
            professionals during the entire life cycle of a development/building project.
        </p>
        </div>
        <div className='col-md-6 mb-4'>
        <h3 className={`${textColorClass} mb-4`}>Part 0 at a glance</h3>
        <p className={`${textColorClass}`}>A development/building project and the built facility comprises 6 major stages.</p>
          <ol className="list-group list-group-numbered" data-bs-theme={mode}>
            <li className='list-group-item'>Location / Siting</li>
            <li className='list-group-item'>Conceptualization and Planning</li>
            <li className='list-group-item'>Designing and Detailing</li>
            <li className='list-group-item'>Construction / Execution</li>
            <li className='list-group-item'>Operation and Maintenance</li>
            <li className='list-group-item'>Decommissioning and Deconstruction</li>
          </ol>
        </div>
        <div className='row g-3'>
        <h3 className={`${textColorClass} mb-4`}>Key Teams of Multidisciplinary Professionals</h3>
        <div className='col-md-4'>
        <ol className="list-group" data-bs-theme={mode}>
            <li className='list-group-item'>Architect</li>
            <li className='list-group-item'>Civil engineer</li>
            <li className='list-group-item'>Structural engineer</li>
            <li className='list-group-item'>Geotechnical engineer</li>
            <li className='list-group-item'>Electrical engineer</li>
            <li className='list-group-item'>Plumbing engineer</li>
            <li className='list-group-item'>Fire protection engineer</li>
            <li className='list-group-item'>HVAC engineer</li>
        </ol>
        </div>
        <div className='col-md-4'>
        <ol className="list-group" data-bs-theme={mode}>
            <li className='list-group-item'>Lift, escalator and moving walk specialist</li>
            <li className='list-group-item'>Acoustics specialist</li>
            <li className='list-group-item'>Information/Communication technology engineer</li>
            <li className='list-group-item'>Health,safety and environment specialist</li>
            <li className='list-group-item'>Environment/Sustainability specialist</li>
            <li className='list-group-item'>Town Planner</li>
            <li className='list-group-item'>Urban Designer</li>
            <li className='list-group-item'>Landscape architect</li>

        </ol>
        </div>
        <div className='col-md-4'>
        <ol className="list-group" data-bs-theme={mode}>
            <li className='list-group-item'>Security system specialist</li>
            <li className='list-group-item'>Interior designer</li>
            <li className='list-group-item'>Quantity surveyor</li>
            <li className='list-group-item'>Project/Construction manager</li>
            <li className='list-group-item'>Accessibility and universal design specialist</li>
            <li className='list-group-item'>Asset/Facility manager</li>
            <li className='list-group-item'>other subject specialists</li>
        </ol>
        </div>
        </div>
        <nav  className="my-3" aria-label="Page navigation" data-bs-theme={mode}>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled"><Link class="page-link" to='/resources/NBC/NBCPart0'>Previous</Link></li>
          <li className="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart0'>0</Link></li>
          <li className="page-item"><Link class="page-link" to='/resources/NBC/NBCPart1'>1</Link></li>
          <li className="page-item"><Link class="page-link" to='/resources/NBC/NBCPart2'>2</Link></li>
          <li className="page-item"><Link class="page-link" to='/resources/NBC/NBCPart1'>Next</Link></li>
        </ul>
        </nav>
        </div>  
        <PDFViewer name={Part0}/> 
    </div>
  )
}

export default NbcPart0


