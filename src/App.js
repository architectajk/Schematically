import React,{lazy,Suspense} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {SchematicContextProvider} from './context/Schematic/SchematicContextProvider';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources/Resources';
import Assets from './pages/Assets';
import About from './pages/About';
import NBC from './pages/Resources/NBC';
import SanReq from './pages/Tools/SanReq/SanReq';
import NaturalLightVentCalc from './pages/Tools/NaturalLightVentCalc/NaturalLightVentCalc';
import ElevatorPlanner from './pages/Tools/ElevatorPlanner/ElevatorPlanner';
import MetalCalc from './pages/Tools/MetalCalc/MetalCalc';
import ScaleCalc from './pages/Tools/ScaleCalc/ScaleCalc';
import './App.css'

const Tools = lazy(()=> import("./pages/Tools/Tools"))

function App() {
  return (
  <>
  <SchematicContextProvider > 
   <BrowserRouter>
    <Navbar/>
    <Alert/>
    <div className="container my-5">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/tools" element={<Suspense fallback={<h1>Loading...</h1>}><Tools/></Suspense>}></Route>
            <Route path="/resources" element={<Resources/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/tools/NaturalLightVentCalc" element={<NaturalLightVentCalc/>}></Route>
            <Route path="/tools/ElevatorPlanner" element={<ElevatorPlanner/>}></Route>
            <Route path="/tools/MetalCalc" element={<MetalCalc/>}></Route>
            <Route path="/tools/ScaleCalc" element={<ScaleCalc/>}></Route>
            <Route path="/tools/SanReq" element={<SanReq/>}></Route>    
            <Route path="/resources/NBC" element={<NBC />}></Route>
            <Route path="/assets" element={<Assets/>}></Route>
          </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
    </SchematicContextProvider> 
  </>
  );
}

export default App;
