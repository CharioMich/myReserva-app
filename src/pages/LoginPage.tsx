import LoginForm from "../components/LoginForm.tsx";
import {useEffect} from "react";

const LoginPage = () => {

  useEffect(() => {
    document.title = "myReserva | Login";
  }, []);

  return (
    <LoginForm />
  )
}
export default LoginPage;