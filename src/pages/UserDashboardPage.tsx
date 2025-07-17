import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { Button, Spinner } from "flowbite-react";
import { AxiosError } from "axios";

// Custom imports
import type { FooterProps, ReservationType } from "../types/types.ts";
import UserReservationComponent from "../components/UserReservationComponent.tsx";
import { getCurrentUserReservations } from "../api/reservations.ts";
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";



const UserDashboardPage = ({footer}: FooterProps) => {

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [reservations, setReservations] = useState<ReservationType[]>();
  const [loading, setLoading] = useState(false); // prod -> set to true

  /**
   * Helper Function.
   * @param dateStr The reservation's date (string) retrieved from the API. Converts it to Date object so we can compare it with current date
   * @return a boolean to help us conditionally style UserReservationComponent
   */
  function isReservationActive(dateStr: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reservationDate = new Date(dateStr);
    reservationDate.setHours(0, 0, 0, 0);

    return reservationDate >= today;
  }

  // Load user's reserved times on component mount
  useEffect(() => {
    setLoading(true); // Comment out for better UX.
    let isMounted = true;

    const controller = new AbortController(); // Axios feature. Kill request if component gets unmounted

    const getReservations = async () => {
      try {
        const response = await getCurrentUserReservations(axiosPrivate);

        if (response) {
          // console.log("Response data: ", response.data);
          if (isMounted) {
            setReservations(response.data);
          }
        } else {
          throw new Error("Unable to retrieve reservations");
        }
        setLoading(false);
      } catch(err) {
        if (err && typeof err === 'object' && 'code' in err && err.code === 'ERR_CANCELED')  {
          console.log('Request canceled:', err.code);
          return; // Exit silently for canceled requests. React 18's Strict Mode mounts/unmounts components twice in dev. This causes the first request to be canceled
        }
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            console.error('Login Required');
          } else {
            console.error('Axios error:', err.message);
          }
        }
        console.log("Failed to retrieve reserved times. Error: ", err);
      }
    }
    getReservations();

    return () => { // Clean up function, runs when the component unmounts
      isMounted = false;
      controller.abort(); // Cancel any pending request. In this case, the request made above, on line 54
    }
  }, [navigate, location, axiosPrivate]);

  useEffect(() => {
    document.title = "myReserva | Dashboard";
  }, []);

  if (loading) {
    return (
      <div className="min-h-[100vh] w-full flex flex-col items-center pt-90 bg-gray-800">
        <Spinner aria-label="Center-aligned spinner example" />
        <div className="text-gray-300 mt-5">Loading reservations...</div>
      </div>
    )
  }

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
        {reservations
          ? (
          <div className="flex flex-wrap justify-evenly mt-10 gap-6 mx-8">
            {[...reservations].sort((a, b) => {
              const aActive = isReservationActive(a.date);
              const bActive = isReservationActive(b.date);

              // Step 1: Active first
              if (aActive !== bActive) return aActive ? -1 : 1;

              // Step 2: Sort by date
              const aDate = new Date(a.date);
              const bDate = new Date(b.date);
              return aDate.getTime() - bDate.getTime(); // earliest first
            })
            .map((reservation) => (
              <UserReservationComponent
                key={reservation._id}
                _id={reservation._id}
                userId={reservation.userId}
                date={reservation.date}
                hours={reservation.hours}
                text={reservation.text}
                isActive={isReservationActive(reservation.date)}
              />
            ))}
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