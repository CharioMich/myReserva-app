import { createContext } from 'react';

import type {LoginFields, userDetails} from "../types/types.ts";

export type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void; // the one actually given from useState()
  setUserDetails: (user: userDetails) => void;
  userDetails: userDetails | null;
  loginUser: (fields: LoginFields) => Promise<userDetails>;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);