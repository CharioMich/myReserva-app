import { createContext } from 'react';

import type {LoginFields, userDetails} from "../types/types.ts";

export type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  userDetails: userDetails | null;
  loginUser: (fields: LoginFields) => Promise<userDetails>;
  logoutUser: () => void;
  refreshToken: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);