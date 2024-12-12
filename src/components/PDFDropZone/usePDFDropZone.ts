import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { pdfjs } from "react-pdf";

// Update worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export interface PDFDropZoneProps {
  onFileSelect?: (file: File) => void;
  onLoadSuccess?: (numPages: number) => void;
  onDelete?: () => void;
}

export const usePDFDropZone = (props: PDFDropZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
      props.onFileSelect?.(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
      props.onFileSelect?.(file);
    }
  };

  const handleDelete = () => {
    setPdfFile(null);
    setPageNumber(1);
    fileInputRef.current!.value = "";
    props.onDelete?.();
  };

  const nextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const previousPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  return {
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
  };
};
