import React from 'react';
import { SchematicContextProvider} from './context/Schematic/SchematicContextProvider';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import Alert from './components/Alert';
import Footer from './components/Footer';
import AppRoutes from './AppRoutes';
import { MathJaxContext } from 'better-react-mathjax';
import './App.css'

function App() {

  return (
  <>
  <SchematicContextProvider>
  <MathJaxContext> 
   <BrowserRouter>
    <Navbar/>
    <Alert/>
    <div className="container mb-4">
      <Breadcrumb/>
      <AppRoutes/>
    </div>
    <Footer/>
    </BrowserRouter>
    </MathJaxContext>
    </SchematicContextProvider> 
  </>
  );
}

export default App;
