export enum AlertType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

// Define an enum for the alert variants
export enum AlertVariant {
  Standard = 'standard',
  Filled = 'filled',
  Outlined = 'outlined',
}

export interface AlertProps {
  title?: string;
  message?: string;
  type: AlertType;
  variant: AlertVariant;
}
