import axios from "axios";

export const handleSubmit = async (
  pdfFile: File,
  selectedOption: string,
  selectedFilters: string[]
): Promise<{ success: boolean; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("mode", selectedOption);

    if (selectedOption === "filter") {
      formData.append("filters", JSON.stringify(selectedFilters));
    }

    const response = await axios.post<Blob>("http://127.0.0.1:5000/api/anonymize-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    // Verify the response is actually a PDF
    if (response.headers["content-type"] !== "application/pdf") {
      throw new Error("Received invalid file format from server");
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
    console.error("Error anonymizing PDF:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
