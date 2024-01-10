import {useContext} from 'react';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';

export default function About() {
  const {mode} = useContext(SchematicContext);
  return (
    <>
    <div className={`container d-flex flex-column text-${mode==='light'?'dark':'light'}`}>
      <h2 className='my-3'>Our Mission</h2>
      <p className='fs-5'> Our mission is to empower individuals and teams to bring their ideas to life with ease. We understand the challenges of balancing creativity and productivity, and we're here to bridge the gap. Whether you're an architect visualizing a new structure, a designer crafting digital masterpieces, or a professional looking to streamline your workflow, Schematically is your go-to platform.</p>
    </div>
    <div className={`container d-flex flex-column text-${mode==='light'?'dark':'light'}`}>
      <h3 className='mb-3'>How Schematically Works</h3>
      <ul>
        <li><b>Conceptualize: </b>Kickstart your projects with our intuitive design tools. Sketch, visualize, and ideate in a user-friendly environment.</li>
        <li><b>Calculate: </b>From complex equations to project estimations, Harness the power of precision with our advanced calculation features. </li>
        <li><b>Create: </b>From design elements to templates, find the perfect building blocks for your projects.</li>
        <li><b>Collaborate: </b>Streamline collaboration within your team. Share ideas, provide feedback, and keep everyone on the same page with our tools.</li>
      </ul>
    </div>
    <div className={`container d-flex flex-column text-${mode==='light'?'dark':'light'}`}>
      <h5 className='mb-3'>Join the Schematically Community</h5>
      <p className='fs-6'>Schematically is more than a platform; it's a community of innovators, creators, and forward-thinkers. Join us on this journey as we redefine the intersection of design and productivity.</p>
      <p className='fs-6'>Ready to transform the way you work? Start scheming with Schematically today!</p>
    </div>
    <div className={`container d-flex flex-column text-${mode==='light'?'dark':'light'}`}>
      <h2 className='mb-3'>Contact Us</h2>
      <p className='fs-6'>Schematically is more than a platform; it's a community of innovators, creators, and forward-thinkers. Join us on this journey as we redefine the intersection of design and productivity.</p>
      <p className='fs-6'>Ready to transform the way you work? Start scheming with Schematically today!</p>
    </div>
    </>
  )
}
