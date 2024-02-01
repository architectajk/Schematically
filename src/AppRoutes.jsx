import React,{lazy,Suspense}  from 'react';
import Spinners from './components/Spinners'; 
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Assets from './pages/Assets';
import About from './pages/About/About';
import Donate from './pages/Donate';
import NBC from './pages/Resources/NBC';
import SanReq from './pages/Tools/SanReq/SanReq';
import FireLifeSafety from './pages/Tools/FireLifeSafety/FireLifeSafety';
import NaturalLightVentCalc from './pages/Tools/NaturalLightVentCalc/NaturalLightVentCalc';
import ElevatorPlanner from './pages/Tools/ElevatorPlanner/ElevatorPlanner';
import MetalCalc from './pages/Tools/MetalCalc/MetalCalc';
import ScaleCalc from './pages/Tools/ScaleCalc/ScaleCalc';
import Sample from './pages/Resources/Sample';

const Tools = lazy(()=> wait(1000).then(()=>import("./pages/Tools/Tools")));
const Resources = lazy(()=>wait(1000).then(()=>import("./pages/Resources/Resources")));

const wait=(time)=>{
    return new Promise(resolve => {
      setTimeout(()=>{resolve()},time)
    })
  }

const SuspenseWithSpinners = ({ children }) => (
    <Suspense fallback={<Spinners />}>{children}</Suspense>
  );
  
  const ToolRoutes = () => (
    <Routes>
      <Route path="/" element={<SuspenseWithSpinners><Tools /></SuspenseWithSpinners>}/>
        <Route path="SanReq" element={<SanReq />} />
        <Route path="NaturalLightVentCalc" element={<NaturalLightVentCalc />} />
        <Route path="ElevatorPlanner" element={<ElevatorPlanner />} />
        <Route path="MetalCalc" element={<MetalCalc />} />
        <Route path="ScaleCalc" element={<ScaleCalc />} />
        <Route path="FireLifeSafety" element={<FireLifeSafety />} />
    </Routes>
  );
  
  const ResourcesRoutes = () => (
    <Routes>
      <Route path="/" element={<SuspenseWithSpinners><Resources /></SuspenseWithSpinners>} />
      <Route path="NBC" element={<NBC />} />
      <Route path="Sample" element={<Sample/>} />
    </Routes>
  );
  
  const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tools/*" element={<ToolRoutes />} />
      <Route path="resources/*" element={<ResourcesRoutes />} />
      <Route path="about" element={<About />} />
      <Route path="assets" element={<Assets />} />
      <Route path="donate" element={<Donate />} />
    </Routes>
  );
  
export default AppRoutes;