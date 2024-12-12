export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getMonthName = (month: number | undefined) => {
  if (month === undefined || month === 0) return "";
  return monthNames[month - 1];
};

export const calculateDuration = (
  startMonth: number,
  startYear: number,
  endMonth?: number | undefined,
  endYear?: number | undefined
): string => {
  const startDate = new Date(startYear, startMonth - 1);
  const endDate =
    endYear && endMonth ? new Date(endYear, endMonth - 1) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  let duration = "";
  if (years > 0) {
    duration += `${years} yr${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (duration) duration += " "; // Add a space if there's already a year part
    duration += `${months} mo${months > 1 ? "s" : ""}`;
  }

  return duration.trim();
};

// Function to sort data by start date first, then prioritize current periods
// this is the old version
// sort by start date first, then prioritize current periods

// this is the new version
// prioritize current periods first, then sort by start date

export function replaceNewlinesWithBr(text: string): string {
  // console.log(text);
  return text.replace(/\n/g, "<br>");
}

export function createUrlFriendlyString(exerciseName: string): string {
  return exerciseName
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

export function replaceNewlinesWithParagraphs(text: string): string {
  // Split the text by newline characters
  const paragraphs = text.split("\n");

  // Wrap each non-empty segment with <p> tags and join them together
  const wrappedText = paragraphs
    .filter((paragraph) => paragraph.trim() !== "") // Filter out empty lines
    .map((paragraph) => `<p>${paragraph.trim()}</p>`) // Wrap each line with <p> tags
    .join("\n"); // Join with newline characters for better readability
  return wrappedText;
}

export const messageTo = (
  email: string,
  defaultSubject: string = "Inquiry about Services",
  defaultMessage: string = "Hello, I'm interested in your services. Could you please provide more details?"
): string => {
  return `mailto:${email}?subject=${encodeURIComponent(
    defaultSubject
  )}&body=${encodeURIComponent(defaultMessage)}`;
};

export const whatsappMessage = (
  tel: string | number,
  defaultMessage: string = "Hello, I'm interested in your services. Could you please provide more details?"
) => {
  return `https://wa.me/${tel}?text=${encodeURIComponent(defaultMessage)}`;
};
