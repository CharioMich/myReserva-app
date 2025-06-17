
export interface FooterProps {
  footer?: React.ReactNode;
}

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