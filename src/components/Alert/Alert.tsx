import { AlertProps, useAlert } from "./useAlert";
import "./Alert.css";
import { FaWindowClose } from "react-icons/fa";
// @toString
import { Alert as AlertMaterial, AlertTitle } from "@mui/material";

const Alert = (props: AlertProps) => {
  const { title, message, type, handleClose, variant } = useAlert(props);
  // Define the classes based on the type of alert

  return (
    <div id="myAlert">
      <AlertMaterial variant={variant} severity={type}>
        {title && (
          <AlertTitle style={{ fontSize: "1.5rem" }}>{title}</AlertTitle>
        )}
        <button className="ToClose" onClick={handleClose}>
          <FaWindowClose />
        </button>
        {message && <div style={{ fontSize: "1.2rem" }}>{message}</div>}
      </AlertMaterial>
    </div>
  );
};

export default Alert;
