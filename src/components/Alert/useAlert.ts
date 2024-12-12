import { useAlert as useAlertHook } from "../../context/AlertContext";
import { AlertType, AlertVariant } from "../../models/Alert/AlertTypes";

export interface AlertProps {
  title?: string;
  message?: string;
  type: AlertType;
  variant: AlertVariant;
}

// type  : success info warning error
// variant : standard filled outlined
export const useAlert = (props: AlertProps) => {
  const { hideAlert } = useAlertHook();

  // Close the alert
  const handleClose = () => {
    hideAlert();
  };

  return { ...props, handleClose };
};
