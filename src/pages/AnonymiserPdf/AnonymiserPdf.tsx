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
import PDFDropZoneManuel from "../../components/PDFDropZoneManuel/PDFDropZoneManuel";

// Create memoized PDFDropZone component
const MemoizedPDFDropZone = React.memo(PDFDropZone);

// Create memoized SidebarContent component
const MemoizedSidebarContent = React.memo(SidebarContent);

const MemoizedPDFDropZoneManuel = React.memo(PDFDropZoneManuel);

const AnonymiserPdf: React.FC = (props: AnonymiserPdfProps) => {
  const {
    isOpen,
    radioOptions,
    filterOptions,
    selectedOption,
    isLoading,
    setWordsAreSelected,
    setSelectedOption,
    selectedFilters,
    wordsAreSelected,
    setSelectedFilters,
    handleToggle,
    handleFileSelect,
    handleLoadSuccess,
    pdfFile,
    setIsLoading,
    error,
    setError,
    optionManuel,
    setOptionManuel,
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
      console.log("wordsAreSelected", wordsAreSelected);
      await handleSubmit(
        pdfFile,
        selectedOption,
        selectedFilters,
        wordsAreSelected,
        optionManuel
      ).then((response) => {
        if (response.success) {
          setIsLoading(false);
          showAlert({
            message: "PDF anonymisé avec succès",
            title: "Succès",
            type: AlertType.Success,
            variant: AlertVariant.Standard,
          });
        } else {
          showAlert({
            message: response.error || "Erreur lors de l'anonymisation du PDF",
            title: "Erreur",
            type: AlertType.Error,
            variant: AlertVariant.Standard,
          });
        }
      });
    } catch (error) {
      showAlert({
        // @ts-expect-error - TS doesn't know that error is an Error
        message: error.message || "Erreur lors de l'anonymisation du PDF",
        title: "Erreur",
        type: AlertType.Error,
        variant: AlertVariant.Standard,
      });

      console.error("Erreur lors de l'anonymisation du PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section  newPageSection anonymiser-pdf">
      <LayoutEdit
        mainContent={
          selectedOption === "manual" ? (
            <MemoizedPDFDropZoneManuel
              onFileSelect={handleFileSelect}
              setWordsAreSelected={setWordsAreSelected}
            />
          ) : (
            <MemoizedPDFDropZone
              onFileSelect={handleFileSelect}
              onLoadSuccess={handleLoadSuccess}
            />
          )
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
            optionManuel={optionManuel}
            setOptionManuel={setOptionManuel}
            error={error}
            isLoading={isLoading}
            buttonText="Anonymiser le PDF"
          />
        }
        title={`Anonymiseur PDF : ${selectedOption.toUpperCase()}`}
        notes="Anonymisez facilement vos fichiers PDF en les glissant-déposant ou en sélectionnant votre fichier PDF"
        titleSidebar="Outils d'anonymisation PDF"
        notesInBottom={`${
          selectedOption === "manual"
            ? "Vous pouvez également anonymiser votre PDF manuellement en sélectionnant les mots à anonymiser."
            : ""
        }`}
        isOpen={isOpen}
        onToggle={handleToggle}
      />
    </section>
  );
};

export default React.memo(AnonymiserPdf);
