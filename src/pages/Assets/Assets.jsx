import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import './Assets.css'

export default function Assets() {
  const {mode} = useContext(SchematicContext);
  //const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
  return (
    <div className='row g-4 g-xl-10 my-3 mb-xl-10' data-bs-theme={mode}>
      <div className='col-lg-8'>
      <Link to="/assets/BuildingProducts">
        <div className='card card-flush h-100'>
        <div id="carouselExample" className="carousel slide">      
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="./images/ilse-hallie-evPnnZXWSfo-unsplash.jpg" height={625} className="d-block w-100 object-fit-cover" alt="..."/>
            </div>
            <div className="carousel-item">
              <img src="../images/mitchell-luo-A9Is1t6YG_I-unsplash.jpg" height={625} className="d-block w-100 object-fit-cover" alt="..."/>
            </div>
            <div className="carousel-item">
              <img src="../images/claudio-schwarz-DTqqdra4Xxo-unsplash.jpg" height={625} className="d-block w-100 object-fit-cover" alt="..."/>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
          <div className='card-img-overlay pt-6'>  
            <div className='Largefont bg-white p-2 text-dark bg-opacity-50'>01|</div>
            <h1 className='bg-white p-2 text-dark bg-opacity-50'>Building Products</h1> 
          </div>
        </div>
        </Link>
      </div>
      <div className='col-lg-4'>
      <Link to="/assets/Maps">
        <div className='card card-flush h-md-50 mb-4'>
            <img className="object-fit-cover" height={300} src="./images/noaa-0XUnd0bXqTE-unsplash.jpg" alt=""/>
          <div className='card-img-overlay'>
            <div className='Largefont bg-white p-2 text-dark bg-opacity-50'>02|</div>
            <h1 className='bg-white p-2 text-dark bg-opacity-50'>Maps</h1> 
          </div>
        </div>
      </Link>
      <Link to="/assets/GhComponents">
        <div className='card card-flush h-md-50'>
            <img className="object-fit-cover" height={300} src="./images/grassh10.jpg" alt=""/>
          <div className='card-img-overlay'>
            <div className='Largefont bg-white p-2 text-dark bg-opacity-50'>03|</div>
            <h1 className='bg-white p-2 text-dark bg-opacity-50'>Rhino Grasshopper components</h1> 
          </div>
        </div>
      </Link>
      </div>
    </div>
  )
}

