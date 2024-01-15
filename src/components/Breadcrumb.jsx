import React,{useContext} from 'react'
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import { Link, useLocation } from 'react-router-dom'
import '../assets/CSS/Breadcrumb.css'

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const Breadcrumb = () => {
    const {mode} = useContext(SchematicContext);
    const location = useLocation()

    // /loc1/loc2 --> Home | loc1 | loc2

    let currentLink = ''

    const crumbs = [ // Add "Home" as the first breadcrumb
    {
      path: '/',
      label: 'Home',
    },
    ...location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {
      currentLink += `/${crumb}`;
            return{
                path: currentLink,
                label: capitalizeFirstLetter(crumb), // Uppercase the label
            }
        })
    ];
      // Check if the first breadcrumb is "Home" and it's not the home page
      if (crumbs.length > 0 && crumbs[0].label === 'Home' && location.pathname === '/') {
        crumbs.shift();
      }
  return (
    <div className='container breadcrumbs mt-2 mb-3'>
    {crumbs.map((crumb, index) => (
      <div className={`crumb text-${mode === 'dark' ? 'light' : 'dark'}`} key={index}>
        <Link to={crumb.path}>{crumb.label}</Link>
      </div>
    ))}
  </div>
  )
}

export default Breadcrumb
