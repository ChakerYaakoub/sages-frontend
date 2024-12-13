import axios from "axios";

// interface AnonymizeRequest {
//   file: File;
//   mode: string;
//   filters?: string[];
// }

export const handleSubmit = async (
  pdfFile: File,
  selectedOption: string,
  selectedFilters: string[],
  wordsAreSelected: string[],
  optionManuel: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("mode", selectedOption);

    if (selectedOption === "filter") {
      formData.append("filters", JSON.stringify(selectedFilters));
    }

    if (wordsAreSelected.length > 0 && selectedOption === "manual") {
      formData.append("words", JSON.stringify(wordsAreSelected));
      formData.append("optionManuel", optionManuel);
    }
    if (wordsAreSelected.length === 0 && selectedOption === "manual") {
      return {
        success: false,
        error: "You must select at least one word",
      };
    }

    const response = await axios.post<Blob>(
      "http://127.0.0.1:5000/api/anonymize-pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      }
    );

    // Verify the response is actually a PDF
    if (response.headers["content-type"] !== "application/pdf") {
      throw new Error("Format de fichier invalide reçu du serveur");
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "anonymized.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'anonymisation du PDF:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue",
    };
  }
};
