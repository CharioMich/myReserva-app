// import axios from "./axios.ts";
import {AxiosError, type AxiosInstance} from "axios";
import {getCookie} from "../utils/cookie.ts";
import type { ReservationProps } from "../types/types.ts";
import {toast} from "sonner";

const RESERVATIONS_URL = import.meta.env.VITE_API_URL + "/reservations";

export const newReservation = async (axiosPrivate: AxiosInstance, payload: ReservationProps) => {

  const accessToken = getCookie("access_token");

  try {
    await axiosPrivate.post(
      RESERVATIONS_URL + `/new`,
      payload,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
    toast.success("Reservation Confirmed");

  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        console.error('Login Required');
      } else if (error.response?.status === 409) {
        console.log("Selected time already reserved");
        toast.error("Error during reservation")
      } else {
        console.error('Axios error:', error.message);
      }
    } else {
      console.error('Unexpected error in getting reserved times:', error);
    }
  }
}