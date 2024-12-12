import React from "react";
import "./ToTop.css";
import { ToTopProps, useToTop } from "./useToTop";

const ToTop: React.FC = (props: ToTopProps) => {
  useToTop(props);
  return null;
};

export default ToTop;
