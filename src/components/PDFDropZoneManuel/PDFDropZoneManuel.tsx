/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import "./PDFDropZoneManuel.css";
import {
  PDFDropZoneManuelProps,
  usePDFDropZoneManuel,
} from "./usePDFDropZoneManuel";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const PDFDropZoneManuel: React.FC<PDFDropZoneManuelProps> = (props) => {
  const {
    isDragActive,
    pdfFile,
    numPages,
    pageNumber,
    fileInputRef,
    selectedWords,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInput,
    handleDelete,
    nextPage,
    previousPage,
    setNumPages,

    removeSelectedWord,
    loadPdfDocument,
  } = usePDFDropZoneManuel(props);

  const pdfUrl = React.useMemo(
    () => (pdfFile ? URL.createObjectURL(pdfFile) : null),
    [pdfFile]
  );

  // Load PDF document when URL changes
  React.useEffect(() => {
    if (pdfUrl) {
      loadPdfDocument(pdfUrl);
    }
  }, [pdfUrl, loadPdfDocument]);

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
        <>
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

            {pdfUrl && (
              <div className="pdf-container">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="pdf-document"
                >
                  <div className="pdf-page-wrapper">
                    <Page
                      pageNumber={pageNumber}
                      className="pdf-page"
                      renderTextLayer={true}
                      renderAnnotationLayer={false}
                      onLoadSuccess={(page) => {
                        // Optional: adjust scale based on container width
                        const viewport = page.getViewport({ scale: 1 });
                        const container =
                          document.querySelector(".pdf-container");
                        if (container) {
                          const scale = container.clientWidth / viewport.width;
                          // @ts-expect-error
                          page.scale = Math.min(scale, 1.5);
                        }
                      }}
                    />
                  </div>
                </Document>

                {selectedWords.length > 0 && (
                  <div className="selected-words-floating">
                    <h4>Selected Words:</h4>
                    <div className="selected-words-list">
                      {selectedWords.map((word, index) => (
                        <span key={index} className="selected-word-tag">
                          {word}
                          <button
                            onClick={() => removeSelectedWord(word)}
                            className="remove-word-btn"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(PDFDropZoneManuel);
