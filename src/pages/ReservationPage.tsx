import ReservationForm from "../components/ReservationForm.tsx";
import type { FooterProps } from "../types/types.ts";
import {useEffect} from "react";

const ReservationPage = ({footer}: FooterProps) => {

  useEffect(() => {
    document.title = "myReserva | Reservation";
  }, []);

  return (
    <>
      <ReservationForm />
      {footer}
    </>

  )
}

export default ReservationPage;