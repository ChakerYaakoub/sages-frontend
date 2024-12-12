import { useState } from "react";

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
      description: "Sélectionnez manuellement les zones à anonymiser",
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

  // set is open false in the tablet
  const isTablet = window.innerWidth < 768;
  const [isOpen, setIsOpen] = useState(!isTablet);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleFileSelect = (file: File) => {
    setPdfFile(file);
  };

  const handleLoadSuccess = (numPages: number) => {
    console.log("PDF loaded, total pages:", numPages);
    // Handle PDF load success
  };

  return {
    ...props,
    isOpen,
    handleToggle,
    handleFileSelect,
    handleLoadSuccess,
    radioOptions,
    filterOptions,
    pdfFile,
    selectedOption,
    setSelectedOption,
    selectedFilters,
    setSelectedFilters,
  };
};
