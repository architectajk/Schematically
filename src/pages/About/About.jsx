import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';

export default function About() {
  const {mode} = useContext(SchematicContext);
  const linkColor = `link-${mode==='dark'?'light':'dark'} link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`;
  return (
    <>
      <div className={`col-sm-6 d-flex flex-column text-${mode==='light'?'dark':'light'}`}>
      <h2 className='my-3'>Hey there, I'm Akshay</h2>
      <p className='fs-5'>Throughout my career, I have successfully contributed to a variety of architectural projects, showcasing a comprehensive understanding of design principles, project management, and client collaboration.</p>
      <p className="fs-5">Other than my interests in Architecture and Design, <p className='d-inline fw-bolder'>Schematically is a Passion Project </p>working to streamline and enhance the design process. This merges my passion for design and the efficiency of the
machine into one, making the design process fun.</p>
    </div>
    <div className={`col-sm-6 d-flex flex-column text-${mode==='light'?'dark':'light'}`}>
      <h2 className='my-3'>My Mission</h2>
      <p className='fs-5'>As I understand the challenges of balancing creativity and productivity,<br />I am working on <p className='d-inline fw-bolder'>Bridging the Gap</p> and Empower individuals and teams to bring their ideas to life with ease. Whether you're an architect visualizing a new structure, a designer crafting digital masterpieces, or a professional looking to streamline your workflow, Schematically is your go-to platform.</p>
    </div>
    <div className={`text-${mode==='light'?'dark':'light'}`}>
      <h2 className='mb-3'>Contact</h2>
      <p className='fs-5'>For feedback and collaborations contact the following links:</p>
      <p><span style={{width : '70px'}} className="badge px-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill me-2">LinkedIn</span>- 
      <Link className={linkColor} to="https://www.linkedin.com/in/akshay-j-kamath" target="_blank" rel="noopener noreferrer"> https://www.linkedin.com/in/akshay-j-kamath</Link></p>
      <p><span style={{width : '70px'}} className="badge px-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill me-2">Github</span>- 
      <Link className={linkColor} to="https://github.com/architectajk" target="_blank" rel="noopener noreferrer"> https://github.com/architectajk</Link></p>
      <p><span style={{width : '70px'}} className="badge px-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill me-2">E-Mail</span>
      - architect.ajk@gmail.com</p>
    </div>
    </>
  )
}
