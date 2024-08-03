import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import Part1 from '../../../assets/NBC/NBCPart1.pdf';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import PDFViewer from '../../../components/PDFViewer';
import '../../../assets/CSS/NBC.css'

const NbcPart1 = () => {
  const {mode} = useContext(SchematicContext);
  const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

  return (
    <div className='container mb-4'>
      <h1 className={`${textColorClass} d-inline-flex pt-3`}>National Building Code of India (2016)</h1>
        <h2 className={`${textColorClass} mb-4`}>Part 1 - Definition</h2> 
        <div className='row'>
          <div className=' col-md-6'>
        <h3 className={`${textColorClass} mb-4`}>Key Content</h3>
        <p className={`${textColorClass} mb-4`}>There are approximately 1,776 terms defined in NBC 2016. Each Part or Section of the NBC
        gives the definitions of the important terms used in it, which may be found in the clause
        'Terminology' for each Part/Section of NBC 2016.
        </p>
        </div>
        <div className=' col-md-6'>
        <h3 className={`${textColorClass} mb-4`}>Part 1 at a glance</h3>
        <p className={`${textColorClass} mb-4`}>Part 1 gives an index of all such definitions and directs the user to refer to the correct Part/
        Section for locating the desired definition. Examples of terms whose definitions are covered in
        various Parts/Sections are:
        </p>
        </div>
        </div>
        <nav aria-label="Page navigation" data-bs-theme={mode}>
        <ul class="pagination justify-content-center">
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart0'>Previous</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart0'>0</Link></li>
          <li class="page-item"><Link class="page-link active" to='/resources/NBC/NBCPart1'>1</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart2'>2</Link></li>
          <li class="page-item"><Link class="page-link" to='/resources/NBC/NBCPart2'>Next</Link></li>
        </ul>
        </nav>
        <PDFViewer name={Part1}/>
    
    </div>
  )
}

export default NbcPart1
