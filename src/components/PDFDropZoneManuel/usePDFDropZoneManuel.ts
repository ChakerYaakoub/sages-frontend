import {
  useState,
  useRef,
  DragEvent,
  ChangeEvent,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { pdfjs } from "react-pdf";
import { TextItem } from "pdfjs-dist/types/src/display/api";

// Update worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export interface PDFDropZoneManuelProps {
  onFileSelect?: (file: File) => void;
  onLoadSuccess?: (numPages: number) => void;
  onDelete?: () => void;
  setWordsAreSelected?: (words: string[]) => void;
}

export const usePDFDropZoneManuel = ({
  onFileSelect,
  // onLoadSuccess,
  onDelete,
  setWordsAreSelected,
}: PDFDropZoneManuelProps = {}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocumentRef = useRef<any | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [textItems, setTextItems] = useState<TextItem[]>([]);

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

  // setWordsAreSelected
  useEffect(() => {
    if (selectedWords.length > 0) {
      setWordsAreSelected?.(selectedWords);
    } else {
      setWordsAreSelected?.([]);
    }
  }, [selectedWords, setWordsAreSelected]);

  // useEffect to set the selectedWords to an empty array when the pdfFile is null
  useEffect(() => {
    if (!pdfFile) {
      setSelectedWords([]);
    }
  }, [pdfFile]);

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

  const loadPdfDocument = useCallback(async (url: string) => {
    const loadingTask = pdfjs.getDocument(url);
    pdfDocumentRef.current = await loadingTask.promise;
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsSelecting(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectionStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseUp = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isSelecting || !selectionStart || !pdfDocumentRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      try {
        const page = await pdfDocumentRef.current.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1.0 });

        // Convert coordinates to PDF space
        const startPdfX = (selectionStart.x * viewport.width) / rect.width;
        const startPdfY =
          viewport.height - (selectionStart.y * viewport.height) / rect.height;
        const endPdfX = (endX * viewport.width) / rect.width;
        const endPdfY =
          viewport.height - (endY * viewport.height) / rect.height;

        // Find words within selection rectangle

        const selectedTexts = textContent.items

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((item: any) => {
            const [, , , , itemX, itemY] = item.transform;
            return (
              itemX >= Math.min(startPdfX, endPdfX) &&
              itemX <= Math.max(startPdfX, endPdfX) &&
              itemY >= Math.min(startPdfY, endPdfY) &&
              itemY <= Math.max(startPdfY, endPdfY)
            );
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((item: any) => item.str.trim())
          .filter(Boolean);

        console.log(selectedTexts);
        // Add new words that aren't already selected
        setSelectedWords((prev) => {
          const newWords = selectedTexts.filter(
            (text: string) => !prev.includes(text)
          );
          return [...prev, ...newWords];
        });
      } catch (error) {
        console.error("Error selecting words:", error);
      }

      setIsSelecting(false);
      setSelectionStart(null);
    },
    [isSelecting, selectionStart, pageNumber]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      console.log(e);
      if (!isSelecting) return;
      // Optional: Add visual feedback for selection area
    },
    [isSelecting]
  );

  const removeSelectedWord = useCallback((wordToRemove: string) => {
    setSelectedWords((prev) => prev.filter((word) => word !== wordToRemove));
  }, []);

  const handleWordSelection = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!pdfDocumentRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      try {
        // Get the page
        const page = await pdfDocumentRef.current.getPage(pageNumber);

        // Get text content
        const textContent = await page.getTextContent();

        // Convert viewport coordinates to PDF coordinates
        const viewport = page.getViewport({ scale: 1.0 });
        const pdfX = (x * viewport.width) / rect.width;
        const pdfY = viewport.height - (y * viewport.height) / rect.height;

        // Find the closest text item to the click
        let closestText = "";
        let minDistance = Infinity;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        textContent.items.forEach((item: any) => {
          const itemX = item.transform[4];
          const itemY = item.transform[5];

          const distance = Math.sqrt(
            Math.pow(pdfX - itemX, 2) + Math.pow(pdfY - itemY, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestText = item.str.trim();
          }
        });

        if (closestText && !selectedWords.includes(closestText)) {
          setSelectedWords((prev) => [...prev, closestText]);
        }
      } catch (error) {
        console.error("Error extracting text:", error);
      }
    },
    [pageNumber, selectedWords]
  );

  // Add a document-wide mouseup listener to capture selections
  useEffect(() => {
    const handleDocumentMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const selectedText = selection.toString().trim();
      if (selectedText && !selectedWords.includes(selectedText)) {
        // if (selectedText.length > 3 && selectedText.length < 40) {
        if (selectedText.length > 3 && selectedText.length < 50) {
          setSelectedWords((prev) => [...prev, selectedText]);
        }
      }
    };

    document.addEventListener("mouseup", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, [selectedWords]);

  useEffect(() => {
    const highlightWords = async () => {
      if (!pdfDocumentRef.current || !selectedWords.length) return;

      try {
        const page = await pdfDocumentRef.current.getPage(pageNumber);
        const textContent = await page.getTextContent();

        // Store text items for highlighting
        setTextItems(textContent.items as TextItem[]);

        // Get all text layer divs
        const textDivs = document.querySelectorAll(".textLayer div");

        textDivs.forEach((div) => {
          const text = div.textContent || "";
          const shouldHighlight = selectedWords.some((word) =>
            text.toLowerCase().includes(word.toLowerCase())
          );

          if (shouldHighlight) {
            div.classList.add("highlighted-text");
          } else {
            div.classList.remove("highlighted-text");
          }
        });
      } catch (error) {
        console.error("Error highlighting words:", error);
      }
    };

    highlightWords();
  }, [selectedWords, pageNumber]);

  return {
    isDragActive,
    pdfFile: memoizedPdfFile,
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
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    isSelecting,
    removeSelectedWord,
    loadPdfDocument,
    setSelectedWords,
    handleWordSelection,
    textItems,
  };
};
