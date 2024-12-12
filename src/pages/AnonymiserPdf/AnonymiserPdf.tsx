import React from "react";
import "./AnonymiserPdf.css";
import { AnonymiserPdfProps, useAnonymiserPdf } from "./useAnonymiserPdf";
import LayoutEdit from "../../components/LayoutEdit/LayoutEdit";
import PDFDropZone from "../../components/PDFDropZone/PDFDropZone";
import SidebarContent from "../../components/SidebarContentAnonymiserPdf/SidebarContent";
import { handleSubmit } from "./handleSubmit";
import { useAlert } from "../../context/AlertContext";
import { AlertType } from "../../models/Alert/AlertTypes";
import { AlertVariant } from "../../models/Alert/AlertTypes";

// Create memoized PDFDropZone component
const MemoizedPDFDropZone = React.memo(PDFDropZone);

// Create memoized SidebarContent component
const MemoizedSidebarContent = React.memo(SidebarContent);

const AnonymiserPdf: React.FC = (props: AnonymiserPdfProps) => {
  const {
    isOpen,
    radioOptions,
    filterOptions,
    selectedOption,
    isLoading,

    setSelectedOption,
    selectedFilters,
    setSelectedFilters,
    handleToggle,
    handleFileSelect,
    handleLoadSuccess,
    pdfFile,
    setIsLoading,
    error,
    setError,
  } = useAnonymiserPdf(props);

  const { showAlert } = useAlert();

  const onSubmit = async () => {
    if (!pdfFile || !selectedOption) {
      setError("Veuillez sélectionner un fichier PDF ");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    if (selectedOption === "filter") {
      if (selectedFilters.length === 0) {
        setError("Veuillez sélectionner au moins un filtre");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }
    }

    try {
      setIsLoading(true);
      await handleSubmit(pdfFile, selectedOption, selectedFilters).then(
        (response) => {
          if (response.success) {
            setIsLoading(false);
          } else {
            showAlert({
              message: "Erreur lors de l'anonymisation du PDF",
              title: "Erreur",
              type: AlertType.Error,
              variant: AlertVariant.Standard,
            });
          }
        }
      );
    } catch (error) {
      showAlert({
        message: "Erreur lors de l'anonymisation du PDF",
        title: "Erreur",
        type: AlertType.Error,
        variant: AlertVariant.Standard,
      });

      console.error("Failed to anonymize PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section  newPageSection anonymiser-pdf">
      <LayoutEdit
        mainContent={
          <MemoizedPDFDropZone
            onFileSelect={handleFileSelect}
            onLoadSuccess={handleLoadSuccess}
          />
        }
        sidebarContent={
          <MemoizedSidebarContent
            onSubmit={onSubmit}
            radioOptions={radioOptions}
            filterOptions={filterOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            error={error}
            isLoading={isLoading}
            buttonText="Anonymiser le PDF"
          />
        }
        title="Anonymiseur PDF"
        notes="Anonymisez facilement vos fichiers PDF en les glissant-déposant ou en sélectionnant votre fichier PDF"
        titleSidebar="Outils d'anonymisation PDF"
        isOpen={isOpen}
        onToggle={handleToggle}
      />
    </section>
  );
};

export default React.memo(AnonymiserPdf);
