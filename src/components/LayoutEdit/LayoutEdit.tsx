import React from "react";
import "./LayoutEdit.css";
import { LayoutEditProps } from "./useLayoutEdit";
import { IoSettingsOutline } from "react-icons/io5";

const LayoutEdit: React.FC<LayoutEditProps> = ({
  mainContent,
  sidebarContent,
  isOpen = true,
  onToggle,
  title,
  titleSidebar,
  notes,
  notesInBottom,
}) => {
  return (
    <div className="layout-edit">
      <div className={`main-content ${isOpen ? "open" : "closed"}`}>
        <div className="layout-edit-header">
          <h1 className="title-layout">{title}</h1>
          <h5 className="notes-layout">{notes}</h5>
        </div>
        <div className="layout-edit-content">
          {mainContent || <div>Main Content Area</div>}
        </div>
        <div className="layout-edit-header">
          <h5 className="notes-layout">{notesInBottom}</h5>
        </div>
      </div>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-button" onClick={onToggle}>
          <IoSettingsOutline className="icon-settings" />
        </button>
        <h1 className="title-layout-sidebar">{titleSidebar}</h1>
        <hr />
        {sidebarContent || <div>Sidebar Content</div>}
      </div>
    </div>
  );
};

export default LayoutEdit;
