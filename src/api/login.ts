// Custom Imports
import axios from './axios.ts';

// Types
import type {LoginFields, userDetails} from "../types/types.ts";

import {AxiosError, type AxiosResponse} from "axios";

export type LoginResponse = {
  status: boolean;
  message: string;
  user: userDetails;
};

const LOGIN_URL = import.meta.env.VITE_API_URL + "/auth/login";


 /**
  * LOGIN
  */
 export async function login({email, password}: LoginFields): Promise<AxiosResponse | null> {
   try {
     const formData = new URLSearchParams();
     formData.append("email", email);
     formData.append("password", password);

     return await axios.post(
       LOGIN_URL,
       formData.toString(),
       {
         headers: {"Content-Type": "application/x-www-form-urlencoded"},
         withCredentials: true,
       }
     );

  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Invalid credentials');
      } else {
        console.error('Axios error:', error.message);
      }
    } else {
      console.error('Unexpected error in Login:', error);
    }
    return null;  // return null on error
  }
}