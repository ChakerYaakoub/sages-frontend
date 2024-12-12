import { replaceNewlinesWithBr } from "../../utils/utilsFc";

export interface AboutUsProps {
  aboutUs: {
    about: string;
    about2: string;
  };
}

export const useAboutUs = (props: AboutUsProps) => {
  // or replaceNewlinesWithParagraphs
  const aboutUs = props.aboutUs;

  const about = replaceNewlinesWithBr(aboutUs.about);
  const about2 = replaceNewlinesWithBr(aboutUs.about2);
  return { ...props, about, about2 };
};
