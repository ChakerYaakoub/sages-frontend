import {
  useState,
  useRef,
  DragEvent,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
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

export const usePDFDropZone = ({
  onFileSelect,
  // onLoadSuccess,
  onDelete,
}: PDFDropZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const memoizedPdfFile = useMemo(() => pdfFile, [pdfFile]);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);

      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf") {
        setPdfFile(file);
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragActive(false);
  }, []);

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file?.type === "application/pdf") {
        setPdfFile(file);
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  const handleDelete = useCallback(() => {
    setPdfFile(null);
    setPageNumber(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onDelete?.();
  }, [onDelete]);

  const nextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const previousPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    isDragActive,
    pdfFile: memoizedPdfFile,
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
