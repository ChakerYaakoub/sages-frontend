import { createContext, useContext, useState } from "react";
import Alert from "../components/Alert/Alert";
import { AlertProps } from "../components/Alert/useAlert";

interface AlertContextType {
  alert: AlertProps | null;
  showAlert: (alert: AlertProps) => void;
  hideAlert: () => void;
}
// how to use this context

// const { showAlert } = useAlert();

// const handleClick = () => {
//   showAlert({
//     message: "This is an alert message!",
//     title: "Alert Title",
//     type: AlertType.Info,
//     variant: AlertVariant.Standard,
//   });
// };

// Create the context with proper type
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Create a custom hook to access the context
export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

// Create the AlertProvider component
export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  // Define state for the alert with proper type
  const [alert, setAlert] = useState<AlertProps | null>(null);

  // Function to hide the alert
  const hideAlert = () => {
    setAlert(null);
  };

  // Function to show an alert
  const showAlert = (newAlert: AlertProps) => {
    setAlert(newAlert);
    // Hide the alert after 10 seconds to match CSS animation
    setTimeout(() => {
      hideAlert();
    }, 10000);
  };

  // Context value
  const contextValue: AlertContextType = {
    alert,
    showAlert,
    hideAlert,
  };

  // Render the provider with context value and children
  return (
    <AlertContext.Provider value={contextValue}>
      {alert && (
        <Alert
          message={alert.message}
          title={alert.title}
          type={alert.type}
          variant={alert.variant}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};
