// COMPONENT TYPES
export interface FooterProps {
  footer?: React.ReactNode;
};

export interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  text?: string;
}

// For footer component. To add class to match page background
export type bgProps = {
  bg?: string
};

// REGISTER TYPE
export type RegisterFormErrors = {
  username?: string,
  name?: string,
  surname?: string,
  email?: string,
  phone?: string,
  password?: string,
  repeatPassword?: string,
};

// LOGIN TYPES
export type LoginFormValues = {
  email: string,
  password: string,
};
export type LoginFormErrors = {
  email?: string,
  password?: string,
};

// RESERVATION TYPES
export type ReservationType = {
  id: string;
  userId: string;
  date: string;         // syntheto PK sth vash?
  hourId: string;     // syntheto PK sth vash?
  text: string;
  isActive: boolean;
};


export type ResTime = {
  id: number;
  available: boolean;
  hours: string;
  checked: boolean;
}