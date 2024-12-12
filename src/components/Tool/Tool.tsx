import React from "react";
import "./Tool.css";
import { ToolProps, useTool } from "./useTool";

const Tool: React.FC<ToolProps> = (props) => {
  const { description, icon, title, handleNavigate } = useTool(props);
  return (
    <div className="tool-container" onClick={handleNavigate}>
      <div className="tool-icon">
        {icon}
        <div className="tool-title hiddenInMobile">{title}</div>
      </div>
      <div className="tool-title visibleInMobile">{title}</div>
      <div className="tool-description">{description}</div>
    </div>
  );
};

export default Tool;
