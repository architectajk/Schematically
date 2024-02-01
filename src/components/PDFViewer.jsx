import { useContext } from 'react';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider'
import { Worker } from '@react-pdf-viewer/core'
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = (props) => {
  const {mode} = useContext(SchematicContext);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    setInitialTab: (doc) => Promise.resolve(0),
  });
  return (
    <div style={{
      border: '1px solid rgba(0, 0, 0, 0.3)',
      height: '750px',
  }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <Viewer fileUrl={props.name} plugins={[defaultLayoutPluginInstance]} theme={mode} defaultScale={0.87}>
        </Viewer>
      </Worker>
    </div>
  );
};

export default PDFViewer
