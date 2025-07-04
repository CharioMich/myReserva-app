import { Label, Textarea, Datepicker, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import type {ResTime} from "../types/types.ts";
import { parse, format } from 'date-fns';
import { useLocation, useNavigate } from "react-router";

import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";


// TIMEPICKER
const allHours: ResTime[] = [
  { "id": 1, "available": false, "hours": "14:00", "checked": false },
  { "id": 2, "available": false, "hours": "14:30", "checked": false },
  { "id": 3, "available": true, "hours": "15:00", "checked": false },
  { "id": 4, "available": false, "hours": "15:30", "checked": false },
  { "id": 5, "available": false, "hours": "16:00", "checked": false },
  { "id": 6, "available": false, "hours": "16:30", "checked": false },
  { "id": 7, "available": false, "hours": "17:00", "checked": false },
  { "id": 8, "available": true, "hours": "17:30", "checked": false },
  { "id": 9, "available": false, "hours": "18:00", "checked": false },
  { "id": 10, "available": false, "hours": "18:30", "checked": false },
  { "id": 11, "available": false, "hours": "19:00", "checked": false },
  { "id": 12, "available": false, "hours": "19:30", "checked": false },
  { "id": 13, "available": false, "hours": "20:00", "checked": false },
  { "id": 14, "available": false, "hours": "20:30", "checked": false },
  { "id": 15, "available": false, "hours": "21:00", "checked": false }
];

const ReservationForm = () => {

  const axiosPrivate = useAxiosPrivate();

  const RESERVATIONS_URL = "/reservations";

  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState<Date | null>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [submitting, setSubmitting] = useState<boolean>(false);
  const [times, setTimes] = useState<ResTime[]>(allHours);
  const [selectedTime, setSelectedTime] = useState<string | null>();

  // Load reserved dates and update the allHours array (the one to be rendered)
  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController(); // Axios feature. Kill request if component gets unmounted
    // const today = new Date();

    const getReservations = async () => {
      try {

        const response = await axiosPrivate.get(RESERVATIONS_URL,
          {
            signal: controller.signal, // Listens for controller.abort() in the clean-up function of useEffect down on line 86
          });

        console.log("RESPONSE from ReservationForm Component:", response.data);

        if (isMounted) {
          const reservedTimes = response.data.times;
          const updatedTimes = allHours.map(time => {
            if (reservedTimes.includes(time.hours)) {
              return {...time, available: false};
            }
            return time;
          });
          setTimes(updatedTimes);

        }
      } catch(err) {
        if (typeof err === 'object' && err !== null && 'code' in err && err.code === 'ERR_CANCELED')  {
          console.log('Request canceled:', err.code);
          return; // Exit silently for canceled requests. React 18's Strict Mode mounts/unmounts components twice in dev. This causes the first request to be canceled
        }
        console.log("Failed to retrieve reserved times. Error: ", err);
        // navigate('/login', { state: { from: location}, replace: true }); // Pass some 'state' so the user can be redirected to the page they were (location) after login
      }
    }
    getReservations();
    setLoading(false);

    return () => { // Clean up function, runs when the component unmounts
      isMounted = false;
      controller.abort(); // Cancel any pending request. In this case, the request made above, on line 54
    }
  }, [navigate, location]);


  // SET THE DATEPICKER
  const today = new Date();
  const maxDate = new Date();
  // Reservations Limited to 2 Months Ahead
  const AHEAD: number = 2;
  maxDate.setMonth(maxDate.getMonth() + AHEAD);

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };


  const handleClick = (id: number, hours: string) => {
    setSelectedTime(hours);
    return setTimes(times?.map(time =>
      time.id === id
        ? {...time, "checked": true}
        : {...time, "checked": false}
    ));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const isValid = validateForm();
    // if (isValid) {
    //   try {
    //     await makeReservation();
    //   } catch(error) {
    //     console.log("Error making reservation");
    //     console.log(error);
    //   }
    //   setValues(initialValues);
    // }

    const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
    const dateObj = parse(`${formattedDate} ${selectedTime}`, "dd/MM/yyyy HH:mm", new Date());

    // console.log(dateObj.toISOString()); // 2025-06-25T16:30:00.000Z Dinei UTC
    // console.log(dateObj.toLocaleString()); // Example: "22/06/2025, 15:00:00"

    console.log(format(dateObj, "dd/MM/yyyy HH:mm:ss")); // Local time format

  }



  const fullDate = date?.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

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
                minDate={today}
                maxDate={maxDate} />
              {date && selectedTime && (
                <div className="flex flex-col items-center my-auto py-10 rounded-2xl space-y-2 bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg shadow-gray-500">
                  <p>
                    <strong className="text-white font-extrabold">{date ? fullDate : "Select date"}</strong>
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
                <ul id="time" className="grid grid-cols-3 gap-2 list-none mt-2">
                  {times.map((time: ResTime) => (
                    <li key={time.id}>
                      <Button
                        disabled={time.available}
                        onClick={() => handleClick(time.id, time.hours)}
                        className={time.checked ? "bg-blue-900 hover:bg-blue-900 " : ""}
                      >{time.hours}
                      </Button>
                    </li>
                  ))}
                </ul>
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
            <Textarea id="comment" placeholder="Leave a comment..." rows={4}/>
          </div>
          <Button className="w-full mx-auto" type="submit">Confirm Reservation</Button>
        </form>
      </section>
    </>


  );
}

export default ReservationForm;