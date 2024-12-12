import { UserData } from "../../models/UserData";
import { replaceNewlinesWithBr } from "../../utils/utilsFc";

export interface DescriptionPageProps {
  data: UserData;
}
export const useDescriptionPage = (props: DescriptionPageProps) => {
  const photo = props.data.photo;

  // or  replaceNewlinesWithParagraphs

  const description = replaceNewlinesWithBr(props.data.description);

  return { ...props, photo, description };
};
