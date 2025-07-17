import { TextModal } from "./TextModal.tsx";
import { useState } from "react";
import { Button } from "flowbite-react";

import type { ReservationType } from "../types/types.ts";
import { DeleteConfirmation } from "./DeleteConfirmation.tsx";


const UserReservationComponent = (reservationData: ReservationType) => {

  const [openTextModal, setOpenTextModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onCloseText = () => {
    setOpenTextModal(false);
  };

  const onCloseConfirm = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <TextModal open={openTextModal} onClose={onCloseText} text={reservationData.text} />
      <DeleteConfirmation open={openConfirmModal} onClose={onCloseConfirm} id={reservationData._id}/>
      <div className={"space-y-3 p-8 bg-gradient-to-br from-gray-600 to-gray-800 w-100 rounded-2xl shadow-lg shadow-black border-2 " + (reservationData.isActive ? "border-emerald-500" : "border-red-500")}>
        <div className={"text-4xl text-white font-semibold " + (!reservationData.isActive ? "line-through" : "text-shadow-sm text-shadow-sky-200")}>
          <h1>Date: <span className="text-red-100">{reservationData.date.split('T')[0]}</span></h1>
          <h2>Time: <span className="text-red-100">{reservationData.hours}</span></h2>
        </div>
        <div>
          <h3 className="text-white font-medium">Reservation Id: <span className="text-red-200">{reservationData._id}</span></h3>
          <button
            onClick={() => setOpenTextModal(true)}
            className={`font-medium text-sky-300 hover:underline hover:text-sky-400 ${ reservationData.text ? "" : "invisible"}`}>
            More Info
          </button>
        </div>
        <div>
          <Button
            onClick={() => setOpenConfirmModal(true)}
            className="w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-gradient-to-br focus:ring-red-300"
          >{reservationData.isActive ? 'Cancel' : 'Delete'} Reservation
          </Button>
        </div>

      </div>
    </>
  )
}

export default UserReservationComponent;