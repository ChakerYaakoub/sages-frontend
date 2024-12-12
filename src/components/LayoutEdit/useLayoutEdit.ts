import { ReactNode } from "react";

export interface LayoutEditProps {
  mainContent?: ReactNode;
  sidebarContent?: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  title?: string;
  titleSidebar?: string;
  notes?: string;
}

export const useLayoutEdit = (props: LayoutEditProps) => {
  return { ...props };
};
