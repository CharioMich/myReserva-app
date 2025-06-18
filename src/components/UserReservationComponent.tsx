import {TextModal} from "./TextModal.tsx";
import {useState} from "react";
import {Button} from "flowbite-react";
import type {ReservationComponentProps} from "../types/types.ts";

const UserReservationComponent = ({isActive}: ReservationComponentProps) => {

  const onClose = () => {
    setOpenModal(false);
  };

  const cancelReservation = () => {
    // TODO Call the api and set isActive to false. Update styling.
  }

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <TextModal open={openModal} onClose={onClose} />
      <div className={"space-y-2 p-8 bg-gradient-to-br from-gray-600 to-gray-800 w-100 rounded-2xl shadow-lg shadow-black border-2 " + (isActive ? "border-emerald-500" : "border-red-500")}>
        <div className={"text-4xl text-white font-semibold " + (!isActive ? "line-through" : "text-shadow-sm text-shadow-sky-200")}>
          <h1>Date: <span>June 16, 2025</span></h1>
          <h2>Time: <span>19:00</span></h2>
        </div>
        <div>
          <h3 className="text-white font-medium">Reservation Id:</h3>
          <button
            onClick={() => setOpenModal(true)}
            className="font-medium text-primary-400 hover:underline hover:text-primary-500">
            More Info
          </button>
        </div>
        <div>
          <Button
            onClick={cancelReservation}
            disabled={!isActive}
            className="w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-gradient-to-br focus:ring-red-300"
          >Cancel Reservation
          </Button>
        </div>

      </div>
    </>
  )
}

export default UserReservationComponent;