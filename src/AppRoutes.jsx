import React,{lazy,Suspense}  from 'react';
import Spinners from './components/Spinners'; 
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Assets from './pages/Assets/Assets';
import About from './pages/About/About';
import Donate from './pages/Donate';

import NBC from './pages/Resources/NBC/NBC';
import NbcPart0 from './pages/Resources/NBC/NbcPart0';
import NbcPart1 from './pages/Resources/NBC/NbcPart1';
import NbcPart2 from './pages/Resources/NBC/NbcPart2';
import NbcPart3 from './pages/Resources/NBC/NbcPart3';
import NbcPart4 from './pages/Resources/NBC/NbcPart4';
import NbcPart5 from './pages/Resources/NBC/NbcPart5';
import NbcPart6 from './pages/Resources/NBC/NbcPart6';
import NbcPart7 from './pages/Resources/NBC/NbcPart7';
import NbcPart8 from './pages/Resources/NBC/NbcPart8';
import NbcPart9 from './pages/Resources/NBC/NbcPart9';
import NbcPart10 from './pages/Resources/NBC/NbcPart10';
import NbcPart11 from './pages/Resources/NBC/NbcPart11';
import NbcPart12 from './pages/Resources/NBC/NbcPart12';

import SanReq from './pages/Tools/SanReq/SanReq';
import FireLifeSafety from './pages/Tools/FireLifeSafety/FireLifeSafety';
import NaturalLightVentCalc from './pages/Tools/NaturalLightVentCalc/NaturalLightVentCalc';
import ElevatorPlanner from './pages/Tools/ElevatorPlanner/ElevatorPlanner';
import ParkingNorms from './pages/Tools/ParkingNorms/ParkingNorms';
import AreaStatement from './pages/Tools/AreaStatement/AreaStatement';
import MetalCalc from './pages/Tools/MetalCalc/MetalCalc';
import ScaleCalc from './pages/Tools/ScaleCalc/ScaleCalc';
import StateByelaws from './pages/Resources/StateByelaws/StateByelaws';
import BuildingProducts from './pages/Assets/Building Products/BuildingProducts';
import Nuvocotto from './pages/Assets/Building Products/nuvocotto/Nuvocotto';
import GhComponents from './pages/Assets/GrasshopperComponents/GhComponents';
import Maps from './pages/Assets/Maps/Maps';

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
        <Route path="ParkingNorms" element={<ParkingNorms/>} />
        <Route path="AreaStatement" element={<AreaStatement/>}/>
    </Routes>
  );
  
  const ResourcesRoutes = () => (
    <Routes>
      <Route path="/" element={<SuspenseWithSpinners><Resources /></SuspenseWithSpinners>} />
      <Route path="NBC" element={<NBC />} />
      <Route path="NBC/NBCPart0" element={<NbcPart0 />} />
      <Route path="NBC/NBCPart1" element={<NbcPart1 />} />
      <Route path="NBC/NBCPart2" element={<NbcPart2 />} />
      <Route path="NBC/NBCPart3" element={<NbcPart3 />} />
      <Route path="NBC/NBCPart4" element={<NbcPart4 />} />
      <Route path="NBC/NBCPart5" element={<NbcPart5 />} />
      <Route path="NBC/NBCPart6" element={<NbcPart6 />} />
      <Route path="NBC/NBCPart7" element={<NbcPart7 />} />
      <Route path="NBC/NBCPart8" element={<NbcPart8 />} />
      <Route path="NBC/NBCPart9" element={<NbcPart9 />} />
      <Route path="NBC/NBCPart10" element={<NbcPart10 />} />
      <Route path="NBC/NBCPart11" element={<NbcPart11 />} />
      <Route path="NBC/NBCPart12" element={<NbcPart12 />} />
      <Route path="StateByelaws" element={<StateByelaws/>} />
    </Routes>
  );
  const AssetsRoutes=()=>(
    <Routes>
      <Route path="/" element={<SuspenseWithSpinners><Assets/></SuspenseWithSpinners>} />
      <Route path="BuildingProducts" element={<BuildingProducts/>} />
      <Route path="BuildingProducts/Nuvocotto" element={<Nuvocotto/>} />
      <Route path="Maps" element={<Maps/>} />
      <Route path="GhComponents" element={<GhComponents/>} />
    </Routes>
  )
  const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tools/*" element={<ToolRoutes />} />
      <Route path="resources/*" element={<ResourcesRoutes />} />
      <Route path="about" element={<About />} />
      <Route path="assets/*" element={<AssetsRoutes/>} />
      <Route path="donate" element={<Donate />} />
    </Routes>
  );
  
export default AppRoutes;