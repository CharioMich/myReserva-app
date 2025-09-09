import {
  Datepicker,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Spinner
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AxiosError } from "axios";
import { format } from "date-fns";

// Custom imports
import type { AdminReservationType } from "../types/types.ts";
import { getReservationsWithUser } from "../api/reservations.ts";
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";
import { TextModal } from "./TextModal.tsx";


export function AdminDashboardTable() {

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  const [reservations, setReservations] = useState<AdminReservationType[]>();
  const [date, setDate] = useState<string>(() => new Date().toLocaleDateString('en-CA')); // 'en-CA' gives us YYYY-MM-DD format
  const [loading, setLoading] = useState(false); // prod -> set to true
  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState<string>();

  // Load user's reserved times on component mount
  useEffect(() => {
    setLoading(true); // Comment out for better UX.
    let isMounted = true;

    const controller = new AbortController(); // Axios feature. Kill request if component gets unmounted

    const getReservations = async () => {
      try {
        const response = await getReservationsWithUser(axiosPrivate, date);

        if (response) {
          console.log("Response data: ", response.data);
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
          } else if (err.response?.status === 403) {
            console.error('Permission denied');
          } else {
            console.error('Axios error:', err.message);
          }
        }
        console.log("Failed to retrieve reservations. Error: ", err);
      }
    }
    getReservations();

    return () => { // Clean up function, runs when the component unmounts
      isMounted = false;
      controller.abort(); // Cancel any pending request. In this case, the request made above, on line 54
    }
  }, [navigate, location, date, axiosPrivate]);

  useEffect(() => {

  }, []);


  /**
   * Set the date after selection
   */
  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      const formatted = format(selectedDate, 'yyyy-MM-dd');
      setDate(formatted);
    }
  };

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

  const onClose = () => {
    setOpenModal(false);
  };

  const handleModalOpening = (text: string) => {
    setText(text);
    setOpenModal(true);
  }



  return (
    <div
      className={`max-w-5xl h-[70vh] bg-blue-100 mt-20 overflow-x-auto w-full m-auto rounded-2xl p-2 border border-gray-300 shadow 
      ${loading ? "flex items-center " : ""}`}
    >
      { loading
      ? (
        <div className="m-auto"><Spinner /></div>
        )
      : (
        <>
          <TextModal open={openModal} onClose={onClose} text={text}/>
          <Datepicker
            onChange={handleDateChange}
            minDate={new Date()}
            className="mb-2 font-bold"
          />
          {reservations?.length !== 0
          ? (
              <Table>
                <TableHead>
                  {/**/}
                  <TableRow className="bg-gradient-to-r from-cyan-200 to-emerald-300">
                    <TableHeadCell className="bg-transparent">Full Name</TableHeadCell>
                    <TableHeadCell className="bg-transparent">Phone No.</TableHeadCell>
                    <TableHeadCell className="bg-transparent">E-mail</TableHeadCell>
                    <TableHeadCell className="bg-transparent">Time</TableHeadCell>
                    <TableHeadCell className="bg-transparent">Info</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                  { reservations && (
                    [...reservations].sort((a, b) => {
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
                            <TableRow
                              key={reservation._id}
                              className="border-gray-700 bg-gray-100 hover:bg-blue-100">
                              <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                {reservation.userId.firstname} {reservation.userId.lastname}
                              </TableCell>
                              <TableCell>{reservation.userId.phoneNumber}</TableCell>
                              <TableCell>{reservation.userId.email}</TableCell>
                              <TableCell className="font-medium text-gray-900">{reservation.hours}</TableCell>
                              <TableCell>
                                {reservation.text
                                  ? (
                                    <button onClick={() => handleModalOpening(reservation.text)} className="font-medium text-primary-500 hover:underline hover:text-primary-600">
                                      View Text
                                    </button>
                                  )
                                  : (
                                    "-"
                                  )}

                              </TableCell>
                            </TableRow>
                          )
                        )
                    )
                  }
                </TableBody>
              </Table>
            )
          : (
            <div className="text-blue-300 text-shadow-md text-shadow-white w-[fit-content] pt-45 mx-auto">No reservations available for selected date</div>
            )}
        </>
        )}
    </div>
  );
}
