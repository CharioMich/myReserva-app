import RegisterForm from "../components/RegisterForm.tsx";
import {useEffect} from "react";

const RegisterPage = () => {

  useEffect(() => {
    document.title = "myReserva | Register";
  }, []);

  return (
    <RegisterForm />
  )
}

export default RegisterPage;