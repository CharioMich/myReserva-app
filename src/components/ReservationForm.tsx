
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
  const allTimes: ResTime[] = [
    { "id": 1, "active": false, "hours": "14:00" },
    { "id": 2, "active": false, "hours": "14:30" },
    { "id": 3, "active": false, "hours": "15:00" },
    { "id": 4, "active": false, "hours": "15:30" },
    { "id": 5, "active": false, "hours": "16:00" },
    { "id": 6, "active": false, "hours": "16:30" },
    { "id": 7, "active": false, "hours": "17:00" },
    { "id": 8, "active": false, "hours": "17:30" },
    { "id": 9, "active": false, "hours": "18:00" },
    { "id": 10, "active": false, "hours": "18:30" },
    { "id": 11, "active": false, "hours": "19:00" },
    { "id": 12, "active": false, "hours": "19:30" },
    { "id": 13, "active": false, "hours": "20:00" },
    { "id": 14, "active": false, "hours": "20:30" },
    { "id": 15, "active": false, "hours": "21:00" }
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
        ? {...time, "active": true}
        : {...time, "active": false}
    ));
  }

  return (
    <>
      <section className="container flex flex-col items-center justify-center pt-8 mx-auto">
        <h2 className="mt-10 text-gray-600 p-5">New Reservation</h2>
        <hr className="w-[70%] mb-6 border-t border-gray-300 " />
        <form className="flex flex-col gap-4">
          <div className="flex flex-row justify-around min-w-xl">
            <div className="flex flex-col mb-2 space-y-2">
              <Label htmlFor="date">Select date:</Label>
              <Datepicker
                id="date"
                onChange={handleDateChange}
                minDate={today}
                maxDate={maxDate} />
              <div className="h-20 my-auto">
                <p>
                  {date ? date.toLocaleDateString() : "Select date"}
                </p>
                <p>
                  {selectedTime ? selectedTime : "Select time"}
                </p>
              </div>
            </div>
            <div>
              <Label htmlFor="time">Select time:</Label>
              <ul id="time" className="grid grid-cols-3 gap-2 list-none mt-2">
                {times.map((time: ResTime) => (
                  <li key={time.id}>
                    <Button
                      disabled={time.active}
                      onClick={() => handleClick(time.id, time.hours)}
                    >{time.hours}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-row max-w-md">
          </div>
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="comment">Extra details (if needed):</Label>
            </div>
            <Textarea id="comment" placeholder="Leave a comment..." rows={4}/>
          </div>
          <Button type="submit">Make Reservation</Button>
        </form>
      </section>
    </>


  );
}

export default ReservationForm;