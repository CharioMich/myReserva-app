import axios from "./axios.ts";
import {AxiosError} from "axios";

// Types
import { type RegisterFormValues } from "../components/RegisterForm.tsx";

const REGISTER_USER_PATH = import.meta.env.VITE_API_URL + '/auth/register';

export default async function registerUser(values: RegisterFormValues) {
  try {
    const formData = new URLSearchParams();
    formData.append("username", values.username);
    formData.append("firstname", values.name);         // backend expects firstname
    formData.append("lastname", values.surname);       // backend expects 'lastname'
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phone);      // backend expects phoneNumber
    formData.append("password", values.password);
    formData.append("confirmPassword", values.repeatPassword );    // backend expects confirmPassword
    formData.append("role", "user" );           // Every user that registers from the app gets a "user" role by default

    return await axios.post(
      REGISTER_USER_PATH,
      formData.toString(),
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        withCredentials: true,
      }
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err;
    }
    console.log("Error in registerUSer. Error: ", err);
    return null;
  }
}