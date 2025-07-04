import axios from './axios.ts';
import {AxiosError} from "axios";
// Custom Imports
import {getCookie} from "../utils/cookie.ts";

const LOGOUT_URL = import.meta.env.VITE_API_URL + "/auth/logout";

export const logout = async () => {

  const accessToken = getCookie("access_token");

  try {
    return await axios.post(LOGOUT_URL,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`, // set the token in Authorization header
        },
      });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unexpected error in Logout:', error);
    }
  }
}
