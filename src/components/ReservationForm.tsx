
import { Label, Textarea, Datepicker, Button } from "flowbite-react";
import {useState} from "react";
import type {ResTime} from "../types/types.ts";

const ReservationForm = () => {

  // SET THE DATEPICKER
  const today = new Date();
  const maxDate = new Date();
  // Reservations Limited to 2 Months Ahead
  const AHEAD: number = 2;
  maxDate.setMonth(maxDate.getMonth() + AHEAD);

  const [date, setDate] = useState<Date | null>();

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // SET THE TIMEPICKER
  // This Data will be fetched from the backend
  const allTimes: ResTime[] = [
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
  ]

  const getActualTimes = () => {
    // return fetchedTimes;
    return allTimes; // TODO: API call to get the reserved times from a DB else return times array
  }

  const [times, setTimes] = useState<ResTime[]>(getActualTimes);
  const [selectedTime, setSelectedTime] = useState<string | null>();

  const handleClick = (id: number, hours: string) => {
    setSelectedTime(hours);
    return setTimes(times.map(time =>
      time.id === id
        ? {...time, "checked": true}
        : {...time, "checked": false}
    ));
  };

  const fullDate = date?.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <>
      <section className="flex flex-col items-center pt-8">
        <h2 className="mt-8 text-gray-600 p-5">New Reservation</h2>
        <hr className="w-[70%] mb-6 border-t border-gray-300 " />
        <form className="md:flex md:flex-col gap-4">
          <div className="md:flex md:flex-row md:justify-around md:min-w-xl">
            {/* Datepicker */}
            <div className="md:flex md:flex-col mb-2 space-y-2 ">
              <Label htmlFor="date">Select date:</Label>
              <Datepicker
                id="date"
                onChange={handleDateChange}
                minDate={today}
                maxDate={maxDate} />
              {date && selectedTime && (
                <div className="flex flex-col items-center my-auto py-10 rounded-2xl space-y-2 bg-gradient-to-br from-pink-500 to-orange-500 shadow-2xl shadow-blue-300">
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
            <div className="flex flex-col items-center">
              <Label htmlFor="time">Select time:</Label>
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