
export interface FooterProps {
  footer?: React.ReactNode;
}

export type ReservationComponentProps = {
  isActive: boolean;
}

// For footer component. To add class to match page background
export type bgProps = {
  bg?: string
}

export type RegisterFormErrors = {
  name?: string,
  surname?: string,
  email?: string,
  phone?: string,
  password?: string,
  repeatPassword?: string,
}

export type LoginFormValues = {
  email: string,
  password: string,
}

export type LoginFormErrors = {
  email?: string,
  password?: string,
}

export type ResTime = {
  id: number;
  available: boolean;
  hours: string;
  checked: boolean;
}