import React,{useState,useContext} from 'react'
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page } from 'react-pdf';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import Portfolio from '../assets/Akshay_J_Kamath_Portfolio.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref} >
            <p>{props.children}</p>
            <p>Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

const Flipbook = () => {
    const {mode} = useContext(SchematicContext);
    const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;

    const [numPages, setNumPages] = useState(null);
    const [pages, setPages] = useState([]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPages([...Array(numPages).keys()]);
    }

  return (
<>
    <div className=' d-block flex-column justify-content-center align-items-center overflow-hidden'>
        <h1 className={textColorClass}>Portfolio</h1>
        <Document file={Portfolio} onLoadSuccess={onDocumentLoadSuccess}>
            {numPages && (
                <HTMLFlipBook width={400} height={570} maxWidth={2000}>
                    {pages.map((pNum) => (
                        <Pages key={pNum} number={pNum + 1}>
                            <Page pageNumber={pNum + 1} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
                        </Pages>
                    ))}
                </HTMLFlipBook>
            )}
        </Document>
    </div>
</>
  )
}

export default Flipbook
