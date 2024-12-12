import axios from "axios";

// interface AnonymizeRequest {
//   file: File;
//   mode: string;
//   filters?: string[];
// }

export const handleSubmit = async (
  pdfFile: File,
  selectedOption: string,
  selectedFilters: string[]
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("mode", selectedOption);

    if (selectedOption === "filter") {
      formData.append("filters", JSON.stringify(selectedFilters));
    }

    const response = await axios.post<Blob>("/api/anonymize-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Important for receiving PDF files
    });

    // Create and download the anonymized PDF
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "anonymized.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error anonymizing PDF:", error);
    throw error;
  }
};
