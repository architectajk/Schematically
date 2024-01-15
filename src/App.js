import React,{lazy,Suspense} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SchematicContextProvider} from './context/Schematic/SchematicContextProvider';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import Spinners from './components/Spinners'; 
import Alert from './components/Alert';
import Footer from './components/Footer';
import Home from './pages/Home';
import Assets from './pages/Assets';
import About from './pages/About/About';
import Donate from './pages/Donate';
import NBC from './pages/Resources/NBC';
import FireLifeSafety from './pages/Tools/FireLifeSafety/FireLifeSafety';
import NaturalLightVentCalc from './pages/Tools/NaturalLightVentCalc/NaturalLightVentCalc';
import ElevatorPlanner from './pages/Tools/ElevatorPlanner/ElevatorPlanner';
import MetalCalc from './pages/Tools/MetalCalc/MetalCalc';
import ScaleCalc from './pages/Tools/ScaleCalc/ScaleCalc';
import './App.css'

const Tools = lazy(()=> wait(1000).then(()=>import("./pages/Tools/Tools")))
const SanReq = lazy(()=> wait(1000).then(()=>import("./pages/Tools/SanReq/SanReq")))
const Resources = lazy(()=>wait(1000).then(()=>import("./pages/Resources/Resources")))

const wait=(time)=>{
  return new Promise(resolve => {
    setTimeout(()=>{resolve()},time)
  })
}
function App() {

  return (
  <>
  <SchematicContextProvider > 
   <BrowserRouter>
    <Navbar/>
    <Alert/>
    <div className="container mb-4">
          <Breadcrumb/>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/tools" element={<Suspense fallback={<Spinners/>}><Tools/></Suspense>}></Route>
            <Route path="/tools/SanReq" element={<Suspense fallback={<Spinners/>}><SanReq/></Suspense>}></Route> 
            <Route path="/tools/NaturalLightVentCalc" element={<NaturalLightVentCalc/>}></Route>
            <Route path="/tools/ElevatorPlanner" element={<ElevatorPlanner/>}></Route>
            <Route path="/tools/MetalCalc" element={<MetalCalc/>}></Route>
            <Route path="/tools/ScaleCalc" element={<ScaleCalc/>}></Route>
            <Route path="/tools/FireLifeSafety" element={<FireLifeSafety/>}></Route>
            <Route path="/resources" element={<Suspense fallback={<Spinners/>}><Resources/></Suspense>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/resources/NBC" element={<NBC />}></Route>
            <Route path="/assets" element={<Assets/>}></Route>
            <Route path="/donate" element={<Donate/>}></Route>
          </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
    </SchematicContextProvider> 
  </>
  );
}

export default App;
