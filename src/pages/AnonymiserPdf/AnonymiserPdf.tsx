import React from "react";
import "./AnonymiserPdf.css";
import { AnonymiserPdfProps, useAnonymiserPdf } from "./useAnonymiserPdf";
import LayoutEdit from "../../components/LayoutEdit/LayoutEdit";
import PDFDropZone from "../../components/PDFDropZone/PDFDropZone";
import SidebarContent from "../../components/SidebarContentAnonymiserPdf/SidebarContent";
import { handleSubmit } from "./handleSubmit";

const AnonymiserPdf: React.FC = (props: AnonymiserPdfProps) => {
  const {
    isOpen,
    radioOptions,
    filterOptions,
    selectedOption,
    setSelectedOption,
    selectedFilters,
    setSelectedFilters,
    handleToggle,
    handleFileSelect,
    handleLoadSuccess,
    pdfFile,
  } = useAnonymiserPdf(props);

  const onSubmit = async () => {
    if (!pdfFile || !selectedOption) {
      return;
    }

    try {
      await handleSubmit(pdfFile, selectedOption, selectedFilters);
    } catch (error) {
      // Handle error (you might want to show a notification to the user)
      console.error("Failed to anonymize PDF:", error);
    }
  };

  return (
    <section className="section  newPageSection anonymiser-pdf">
      <LayoutEdit
        mainContent={
          <div>
            <PDFDropZone
              onFileSelect={handleFileSelect}
              onLoadSuccess={handleLoadSuccess}
            />
          </div>
        }
        sidebarContent={
          <SidebarContent
            onSubmit={onSubmit}
            radioOptions={radioOptions}
            filterOptions={filterOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
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

export default AnonymiserPdf;
