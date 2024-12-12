import { useEffect, useState } from "react";
import { UserData } from "../../models/UserData";
import { createUrlFriendlyString } from "../../utils/utilsFc";

export interface OverviewProps {
  // data: WorkspaceDescription[] | News[];
  data: UserData[];
  subtitle: string;
  title: string;
}

export const useOverview = (props: OverviewProps) => {
  const [isActive, setIsActive] = useState(false);
  const [disabledLink, setDisabledLink] = useState(true);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>; // Type for timeout ID

    if (isActive) {
      timeoutId = setTimeout(() => setDisabledLink(false), 500); // set disabled link to false after 500ms
    } else {
      setDisabledLink(true);
    }

    return () => clearTimeout(timeoutId); // Cleanup on component unmount
  }, [isActive]);

  const handleMouseEnter = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);
  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  return {
    ...props,
    disabledLink,
    createUrlFriendlyString,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  };
};
