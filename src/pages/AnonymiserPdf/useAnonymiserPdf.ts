import { useState, useMemo, useCallback } from "react";
import { useLoading } from "../../context/LoadingContext";

export type AnonymiserPdfProps = object;

export const useAnonymiserPdf = (props: AnonymiserPdfProps) => {
  const radioOptions = [
    {
      id: "auto",
      label: "Automatique",
      description:
        "Détection et anonymisation automatique des données sensibles",
    },
    {
      id: "manual",
      label: "Manuel",
      description:
        "Sélectionnez les zones à anonymiser (mot par mot ou par masque) :",
    },
    {
      id: "filter",
      label: "Par filtres",
      description: "Anonymiser par type (noms, téléphones, etc.)",
    },
  ];

  const filterOptions = [
    { id: "names", label: "Noms et prénoms" },
    { id: "phones", label: "Numéros de téléphone" },
    { id: "emails", label: "Adresses email" },
    // { id: "addresses", label: "Adresses postales" },
    { id: "iban", label: "IBAN" },
    { id: "bic", label: "BIC" },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("auto");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { setIsLoading, isLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);
  const [wordsAreSelected, setWordsAreSelected] = useState<string[]>([]);

  // if its choice the manuel then we have 2 option :
  // 1. select the words to anonymize to word
  // 2. select the words to anonymize to ######

  const [optionManuel, setOptionManuel] = useState<string>("word");

  // set is open false in the tablet
  const isTablet = window.innerWidth < 768;
  const [isOpen, setIsOpen] = useState(!isTablet);

  const memoizedPdfFile = useMemo(() => pdfFile, [pdfFile]);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleFileSelect = useCallback((file: File) => {
    setPdfFile(file);
  }, []);

  const handleLoadSuccess = useCallback((numPages: number) => {
    console.log("PDF loaded, total pages:", numPages);
    // Handle PDF load success
  }, []);

  return {
    ...props,
    isOpen,
    handleToggle,
    handleFileSelect,
    handleLoadSuccess,
    isLoading,
    setIsLoading,
    radioOptions,
    filterOptions,
    pdfFile: memoizedPdfFile,
    selectedOption,
    setSelectedOption,
    selectedFilters,
    setSelectedFilters,
    error,
    setError,
    wordsAreSelected,
    setWordsAreSelected,
    optionManuel,
    setOptionManuel,
  };
};
