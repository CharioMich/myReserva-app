/**
 * COMPONENT TYPES
 */
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

/**
 * REGISTER TYPE
 */
export type RegisterFormErrors = {
  username?: string,
  name?: string,
  surname?: string,
  email?: string,
  phone?: string,
  password?: string,
  repeatPassword?: string,
};

/**
 * LOGIN TYPES
 */
export type LoginFields = {
  email: string,
  password: string,
};
export type LoginFormErrors = {
  email?: string,
  password?: string,
};


/**
 * RESERVATION TYPES
 */
export type ReservationType = {
  id: string;
  userId: string;
  date: string;
  hourId: string;
  text: string;
  isActive: boolean;
};

export type ResTime = {
  id: number;
  reserved: boolean;
  hours: string;
  checked: boolean;
};

export type ReservationProps = {
  date?: string | null;
  hours?: string | null;
  userId?: string;
  text?: string | null;
}


/**
 * USER TYPES
 */
export type userDetails = {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
};




