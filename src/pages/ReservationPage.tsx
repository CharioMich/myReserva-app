import ReservationForm from "../components/ReservationForm.tsx";
import type { FooterProps } from "../types/types.ts";

const ReservationPage = ({footer}: FooterProps) => {
  return (
    <>
      <ReservationForm />
      {footer}
    </>

  )
}

export default ReservationPage;