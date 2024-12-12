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
          <p>Drag and drop a PDF here or click to upload</p>
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
              <MdDeleteOutline /> Delete
            </button>
            <div className="page-controls">
              <button onClick={previousPage} disabled={pageNumber <= 1}>
                &#8592;
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button onClick={nextPage} disabled={pageNumber >= numPages}>
                &#8594;
              </button>
            </div>
          </div>
          <Document
            file={URL.createObjectURL(pdfFile)}
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
        </div>
      )}
    </div>
  );
};

export default PDFDropZone;
