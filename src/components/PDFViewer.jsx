/* Native browser PDF viewer.
   The NBC PDFs are trusted, self-hosted files served from /pdfs/, so the
   browser's built-in PDF viewer is the simplest and most secure way to show
   them — it drops the pdfjs-dist / @react-pdf-viewer dependencies (and their
   ~20 vulnerabilities) entirely. Same `name` prop as before, so the NBC pages
   don't change. */
const PDFViewer = ({ name }) => (
  <div
    style={{
      border: '1px solid rgba(128, 128, 128, 0.3)',
      borderRadius: 8,
      overflow: 'hidden',
    }}
  >
    <iframe
      src={name}
      title="PDF document"
      style={{ width: '100%', height: '750px', border: 'none', display: 'block' }}
    />
    <div style={{ padding: '8px 12px', fontSize: 13 }}>
      Trouble viewing?{' '}
      <a href={name} target="_blank" rel="noopener noreferrer">
        Open the PDF in a new tab &#8599;
      </a>
    </div>
  </div>
);

export default PDFViewer;
