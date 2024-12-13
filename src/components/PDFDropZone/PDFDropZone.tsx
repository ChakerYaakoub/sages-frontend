import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDropZoneProps, usePDFDropZone } from "./usePDFDropZone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import "./PDFDropZone.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const PDFDropZone: React.FC<PDFDropZoneProps> = ({
  onFileSelect,
  onLoadSuccess,
  onDelete,
}) => {
  const {
    isDragActive,
    pdfFile,
    numPages,
    pageNumber,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInput,
    handleDelete,
    nextPage,
    previousPage,
    setNumPages,
  } = usePDFDropZone({ onFileSelect, onLoadSuccess, onDelete });

  // Memoize the PDF URL to prevent unnecessary re-renders
  const pdfUrl = React.useMemo(
    () => (pdfFile ? URL.createObjectURL(pdfFile) : null),
    [pdfFile]
  );

  // Memoize the Document component
  const PdfDocument = React.memo(({ url }: { url: string }) => (
    <Document
      file={url}
      onLoadSuccess={({ numPages }) => {
        setNumPages(numPages);
        onLoadSuccess?.(numPages);
      }}
      onLoadError={(error) => {
        console.error("Error loading PDF:", error);
      }}
      className="pdf-document"
    >
      <Page
        pageNumber={pageNumber}
        className="pdf-page"
        renderTextLayer={false}
        renderAnnotationLayer={false}
        scale={1.0}
      />
    </Document>
  ));

  // Clean up URL object when component unmounts or PDF changes
  React.useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="pdf-dropzone-container">
      {!pdfFile ? (
        <div
          className={`pdf-dropzone ${isDragActive ? "active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <IoCloudUploadOutline className="upload-icon" />
          <p>Glissez et déposez un PDF ici ou cliquez pour télécharger</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".pdf"
            className="file-input"
          />
        </div>
      ) : (
        <div className="pdf-preview">
          <div className="pdf-controls">
            <button onClick={handleDelete} className="delete-btn">
              <MdDeleteOutline /> Supprimer
            </button>
            <div className="page-controls">
              <button onClick={previousPage} disabled={pageNumber <= 1}>
                &#8592;
              </button>
              <span>
                Page {pageNumber} sur {numPages}
              </span>
              <button onClick={nextPage} disabled={pageNumber >= numPages}>
                &#8594;
              </button>
            </div>
          </div>
          {pdfUrl && <PdfDocument url={pdfUrl} />}
        </div>
      )}
    </div>
  );
};

export default React.memo(PDFDropZone);
