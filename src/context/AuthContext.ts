import { createContext } from 'react';

import type {LoginFields, UserDetails} from "../types/types.ts";

export type AuthContextProps = {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void; // the one actually given from useState()
  setUserDetails: (user: UserDetails) => void;
  userDetails: UserDetails | null;
  loginUser: (fields: LoginFields) => Promise<UserDetails>;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);