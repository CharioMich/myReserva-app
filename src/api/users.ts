import axios from "./axios.ts";
import {AxiosError} from "axios";
import {getCookie} from "../utils/cookie.ts";

const USERS_URL = import.meta.env.VITE_API_URL + "/users";

export const getCurrentUser = async () => {

  const accessToken = getCookie("access_token");

  try {
    const res = await axios.get(
      USERS_URL + '/current',
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        console.error('Login Required');
      } else {
        console.error('Axios error:', error.message);
      }
    } else {
      console.error('Unexpected error in getting current user:', error);
    }
  }
}