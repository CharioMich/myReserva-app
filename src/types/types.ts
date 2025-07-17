/**
 * COMPONENT TYPES
 */
export interface FooterProps {
  footer?: React.ReactNode;
}

export interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  text?: string;
  id?: string;
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
  _id: string;
  userId: string;
  date: string;
  hours: string;
  text: string;
  isActive: boolean;
};

export type AdminReservationType = {
  _id: string;
  userId: AdminUserDetails;
  date: string;
  hours: string;
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
export type UserDetails = {
  userId: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
};

export type AdminUserDetails = {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  role: string;
  updatedAt?: string;
  createdAt?: string;
}




