import { ReactNode } from "react";

export interface LayoutEditProps {
  mainContent?: ReactNode;
  sidebarContent?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  title?: string;
  titleSidebar?: string;
  notes?: string;
  notesInBottom?: string;
  isLoading?: boolean;
  buttonText?: string;
}

export const useLayoutEdit = (props: LayoutEditProps) => {
  return { ...props };
};
