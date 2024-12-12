import { whatsappMessage } from "../../utils/utilsFc.ts";
import { footer } from "../../assets/data.ts";

export type FooterProps = object;

export const useFooter = (props: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return { ...props, currentYear, whatsappMessage, footer };
};
