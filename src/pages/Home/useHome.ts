export type HomeProps = object;
import { useEffect } from "react";
import { useState } from "react";
import { aboutUs, contactUs } from "../../assets/data";
import { tools } from "./tools";

export const useHome = (props: HomeProps) => {
  const [showAll, setShowAll] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDisplayCount(3);
      } else {
        setDisplayCount(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleTools = showAll ? tools : tools.slice(0, displayCount);
  return {
    ...props,
    aboutUs,
    contactUs,
    tools,
    visibleTools,
    showAll,
    setShowAll,
    displayCount,
  };
};
