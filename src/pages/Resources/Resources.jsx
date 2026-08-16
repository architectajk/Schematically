import React, { useState, useContext } from 'react';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Accordion'
import NBC from '../../pages/Resources/NBC/NBC'
import '../../assets/CSS/Resources.css';

export default function Resources() {
  const { mode } = useContext(SchematicContext);
  const [activeTab, setActiveTab] = useState('nbc');

  const renderContent = () => {
    switch (activeTab) {
      case 'nbc':
        return <NBC/>;
      case 'byelaws':
        return (
          <>
            <h3 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>State-wise Model Byelaws</h3>
            <p>Explore regional variations in building byelaws across Indian states.</p>
            <Link to="/resources/StateByelaws" className="btn btn-outline-primary">Read State Byelaws</Link>
          </>
        );
      case 'height':
        return (
          <>
            <h3 className={`text-${mode === 'light' ? 'dark' : 'light'}`}>Building Height Byelaws (Bengaluru)</h3>
            <p>Local (BBMP / RMP-2015) and aerodrome (AAI) height controls, and how they combine.</p>
            <Link to="/resources/HeightByelaws" className="btn btn-outline-primary">Read Height Byelaws</Link>
          </>
        );
      default:
        return <p>Select a resource from the sidebar.</p>;
    }
  };

  const accordionItems = [
    {
      id: 'nbc',
      title: 'National Building Code',
      content: [
      { label: 'Part 0', link: '/resources/NBC/NbcPart0' },
      { label: 'Part 1', link: '/resources/NBC/NbcPart1' },
      { label: 'Part 2', link: '/resources/NBC/NbcPart2' },
      { label: 'Part 3', link: '/resources/NBC/NbcPart3' },
      { label: 'Part 4', link: '/resources/NBC/NbcPart4' },
      { label: 'Part 5', link: '/resources/NBC/NbcPart5' },
      { label: 'Part 6', link: '/resources/NBC/NbcPart6' },
      { label: 'Part 7', link: '/resources/NBC/NbcPart7' },
      { label: 'Part 8', link: '/resources/NBC/NbcPart8' },
      { label: 'Part 9', link: '/resources/NBC/NbcPart9' },
      { label: 'Part 10', link: '/resources/NBC/NbcPart10' },
      { label: 'Part 11', link: '/resources/NBC/NbcPart11' },
      { label: 'Part 12', link: '/resources/NBC/NbcPart12' },
    ]
    },
    {
      id: 'byelaws',
      title: 'State Byelaws',
      content: null,
    },
    {
      id: 'height',
      title: 'Building Height Byelaws',
      content: null,
    },
  ];

  return (
    <div className="container" data-bs-theme={mode}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 border-end py-3">
          <Sidebar
            items={accordionItems}
            activeId={activeTab}
            onSelect={(id) => setActiveTab(id)}
            mode={mode}
          />
        </div>

        {/* Content Panel */}
        <div className="col-md-9 py-4 px-5">
          <div className={`text-${mode === 'light' ? 'dark' : 'light'}`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
