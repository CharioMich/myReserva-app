import UserReservationComponent from "../components/UserReservationComponent.tsx";
import {useEffect} from "react";
import type {FooterProps} from "../types/types.ts";
import {Button} from "flowbite-react";
import {Plus} from "lucide-react";
import {Link} from "react-router";

const UserDashboardPage = ({footer}: FooterProps) => {

  const res = true;

  useEffect(() => {
    document.title = "myReserva | Dashboard";
  }, []);

  return (
    <>
      <div className="min-h-[100vh] w-full flex flex-col items-center pt-22 bg-gray-800">
        <div className="w-full px-10 flex justify-between">
          <h1 className="text-3xl font-bold text-white">My<span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-orange-400">Reservations</span></h1>
          <Button
            as={Link}
            to="/new-reservation"
            color="dark">
            <Plus />New Reservation
          </Button>
        </div>
        <hr className="w-[95%] border-t border-gray-500 opacity-50 my-4"/>
        {res
          ? (
          <div className="flex flex-wrap justify-evenly mt-10 space-y-8 space-x-3">
            <UserReservationComponent isActive={true} />
            <UserReservationComponent isActive={true} />
            <UserReservationComponent isActive={false} />
            <UserReservationComponent isActive={true} />
            <UserReservationComponent isActive={true} />
            <UserReservationComponent isActive={true} />
            <UserReservationComponent isActive={true} />
          </div>
        )
        : (
          <div className="flex items-center h-[50vh] text-gray-300 font-light">No reservations made yet...</div>
          )}
      </div>
      {footer}
    </>
  )
}

export default UserDashboardPage;