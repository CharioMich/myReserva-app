
import { Label, Select, Textarea, Datepicker, Button } from "flowbite-react";

const today = new Date();
const maxDate = new Date();

// Reservations Limited to 2 Months Ahead
const AHEAD: number = 2;
maxDate.setMonth(maxDate.getMonth() + AHEAD);

const ReservationForm = () => {
  return (
    <>

      <section className="container flex flex-col items-center justify-center h-[82vh] mx-auto">
        <h2 className="mt-10 text-gray-600 p-5">Make a Reservation</h2>
        <hr className="w-[70%] mb-6 border-t border-gray-300 " />

        <form className="flex min-w-md max-w-lg flex-col gap-4">

          <div className="max-w-md">
            <Datepicker minDate={today} maxDate={maxDate} />

            <div className="mb-2 block">
              <Label htmlFor="countries">Select available time:</Label>
            </div>
            <Select id="countries" required>
              <option>16:30</option>

            </Select>
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="comment">Extra details (if needed):</Label>
            </div>
            <Textarea id="comment" placeholder="Leave a comment..." rows={4} />
          </div>
          <Button type="submit">Make Reservation</Button>
        </form>
      </section>
    </>


  );
}

export default ReservationForm;