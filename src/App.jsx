import React from 'react';
import { SchematicContextProvider} from './context/Schematic/SchematicContextProvider';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import Alert from './components/Alert';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import './App.css'

function App() {

  return (
  <>
  <SchematicContextProvider> 
   <BrowserRouter>
    <Navbar/>
    <Alert/>
    <div className="container mb-4">
      <Breadcrumb/>
      <AppRoutes/>
    </div>
    <Footer/>
    </BrowserRouter>
    </SchematicContextProvider> 
  </>
  );
}

export default App;
