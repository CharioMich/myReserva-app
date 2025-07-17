import { Label, Textarea, Datepicker, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { parse, format } from 'date-fns';
import { useLocation, useNavigate } from "react-router";

// Custom Imports
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";
import { newReservation } from "../api/reservations.ts";

// Types
import type { ReservationProps, ResTime } from "../types/types.ts";
import * as React from "react";


// TIMEPICKER.
const allHours: ResTime[] = [
  { "id": 1, "reserved": false, "hours": "14:00", "checked": false },
  { "id": 2, "reserved": false, "hours": "14:30", "checked": false },
  { "id": 3, "reserved": false, "hours": "15:00", "checked": false },
  { "id": 4, "reserved": false, "hours": "15:30", "checked": false },
  { "id": 5, "reserved": false, "hours": "16:00", "checked": false },
  { "id": 6, "reserved": false, "hours": "16:30", "checked": false },
  { "id": 7, "reserved": false, "hours": "17:00", "checked": false },
  { "id": 8, "reserved": false, "hours": "17:30", "checked": false },
  { "id": 9, "reserved": false, "hours": "18:00", "checked": false },
  { "id": 10, "reserved": false, "hours": "18:30", "checked": false },
  { "id": 11, "reserved": false, "hours": "19:00", "checked": false },
  { "id": 12, "reserved": false, "hours": "19:30", "checked": false },
  { "id": 13, "reserved": false, "hours": "20:00", "checked": false },
  { "id": 14, "reserved": false, "hours": "20:30", "checked": false },
  { "id": 15, "reserved": false, "hours": "21:00", "checked": false }
];

const ReservationForm = () => {

  const axiosPrivate = useAxiosPrivate();
  const RESERVATIONS_URL = "/reservations";

  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState<string>(() => new Date().toLocaleDateString('en-CA')); // 'en-CA' gives us YYYY-MM-DD format
  // const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [times, setTimes] = useState<ResTime[]>(allHours);
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const [text, setText] = useState<string | null>(null);

  // Load reserved times on component mount and update the allHours array (timepicker)
  useEffect(() => {
    // setLoading(true); Commented out for better UX.
    let isMounted = true;

    const controller = new AbortController(); // Axios feature. Kill request if component gets unmounted

    // Get reservations by date
    const getReservations = async () => {
      try {
        const response = await axiosPrivate.get(
          RESERVATIONS_URL + `/new/${date}`,
          {
            signal: controller.signal, // Listens for controller.abort() in the clean-up function of useEffect down on line 86
          });

        // console.log("Response data: ", response.data);

        if (isMounted) {
          const updatedTimes = allHours.map(timeObj => {
            const isReserved = response.data.some(
              (reservation: ResTime) => reservation.hours === timeObj.hours
            );
            return {
              ...timeObj,
              reserved: isReserved ? true : timeObj.reserved,
            };
          });
          setTimes(updatedTimes);
          // setLoading(false); Commented out for better UX.
        }
      } catch(err) {
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === 'ERR_CANCELED')  {
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
        // navigate('/login', { state: { from: location}, replace: true }); // Pass some 'state' so the user can be redirected to the page they were (location) after login
      }
    }
    getReservations();

    return () => { // Clean up function, runs when the component unmounts
      isMounted = false;
      controller.abort(); // Cancel any pending request. In this case, the request made above, on line 54
    }
  }, [navigate, location, date, axiosPrivate]);



  // SET THE DATEPICKER LIMIT
  const maxDate = new Date();
  // Reservations Limited to 2 Months Ahead
  const AHEAD: number = 2;
  maxDate.setMonth(maxDate.getMonth() + AHEAD);

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
   * Set the additional text
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  /**
   * Mark the selected time button and unmark the previously selected one
   */
  const handleClick = (id: number, hours: string) => {
    setSelectedTime(hours);
    return setTimes(times?.map(time =>
      time.id === id
        ? {...time, "checked": true}
        : {...time, "checked": false}
    ));
  };

  /**
   * Submit new reservation
   */
  const handleSubmit = async (e: React.FormEvent) => {
    setSubmitting(true); // Disable submit button to avoid submitting data twice (double-click)
    e.preventDefault();

    const newFormattedDate = date ? format(date, "dd/MM/yyyy") : date;
    const dateObj = parse(`${newFormattedDate}`, "dd/MM/yyyy", new Date());
    const isoDate = format(dateObj, 'yyyy-MM-dd'); // Convert to ISO format before sending to the backend

    const reservationPayload: ReservationProps = {
      date: isoDate,
      hours: selectedTime,
      text: text
    };

    try {
      await newReservation(axiosPrivate, reservationPayload);
      setSubmitting(false);
      navigate("/user-dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  // Reverse string so we can display date in localized format
  const displayDate = date.split('-').reverse().join('-');

  return (
    <>
      <section className="flex flex-col items-center pt-8  bg-gradient-to-b from-gray-900 to-white">
        <h2 className="mt-8 text-white font-semibold p-5">New <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-orange-400">Reservation</span></h2>
        <hr className="w-[70%] mb-6 border-t border-gray-300 " />
        <form onSubmit={handleSubmit} className="md:flex md:flex-col gap-4">
          <div className="md:flex md:flex-row md:justify-around md:min-w-xl">
            {/* Datepicker */}
            <div className="md:flex md:flex-col mb-2 space-y-2 ">
              <Label htmlFor="date" className="text-white">Select date:</Label>
              <Datepicker
                id="date"
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={maxDate} />
              {date && selectedTime && (
                <div className="flex flex-col items-center my-auto py-10 rounded-2xl space-y-2 bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg shadow-gray-500">
                  <p>
                    <strong className="text-white font-extrabold">{date ? displayDate : "Select date"}</strong>
                  </p>
                  <p className="text-white">
                    at: <strong className="font-extrabold">{selectedTime ? selectedTime : "Select time"}</strong>
                  </p>
                </div>
              )}
            </div>
            {/* Time buttons */}
            {times && (
              <div className="flex flex-col items-center">
                <Label htmlFor="time" className="text-white">Select time:</Label>
                {/*{!loading && (*/}
                  <ul id="time" className="grid grid-cols-3 gap-2 list-none mt-2">
                    {times.map((time: ResTime) => (
                      <li key={time.id}>
                        <Button
                          disabled={time.reserved}
                          onClick={() => handleClick(time.id, time.hours)}
                          className={time.checked ? "bg-blue-900 hover:bg-blue-900 " : ""}
                        >{time.hours}
                        </Button>
                      </li>
                    ))}
                  </ul>
                {/*)}*/}
                <div className="flex flex-col mt-3 items-center">
                  <div className="flex flex-row"><div className="w-4 h-4 mt-1 mr-2 rounded bg-blue-600"></div><i>Available time</i></div>
                  <div className="flex flex-row"><div className="w-4 h-4 mt-1 mr-2 rounded bg-blue-300"></div><i>Reserved time</i></div>
                </div>
              </div>
            )}
          </div>
          <div className="py-1">
            <div className="mb-2 block">
              <Label htmlFor="comment">Extra details (if needed):</Label>
            </div>
            <Textarea
              id="comment"
              onChange={handleTextChange}
              placeholder="Leave a comment..."
              rows={4}
            />
          </div>
          <Button
            className="w-full mx-auto"
            type="submit"
            disabled={submitting}
          >Confirm Reservation
          </Button>
        </form>
      </section>
    </>


  );
}

export default ReservationForm;