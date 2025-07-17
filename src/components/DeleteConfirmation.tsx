import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";

import { type ModalComponentProps } from "../types/types.ts";
import { deleteReservation } from "../api/reservations.ts";
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";

import { useNavigate } from "react-router";

export function DeleteConfirmation({ open, onClose, id }: ModalComponentProps) {

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = async (id: string | undefined) => {
    await deleteReservation(axiosPrivate, id);
    // onClose();
    navigate("/user-dashboard"); // Refresh page and fetch updated reservation data
  }

  return (
    <>
      <Modal show={open} size="md" onClose={onClose} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to cancel this reservation?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={() => handleDelete(id)}>
                Yes, I'm sure
              </Button>
              <Button color="alternative" onClick={onClose}>
                Go back
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}