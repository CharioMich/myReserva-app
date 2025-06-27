import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";

// import { HiOutlineExclamationCircle } from "react-icons/hi";
import { type ModalComponentProps } from "../types/types.ts";

export function DeleteConfirmation({ open, onClose }: ModalComponentProps) {

  const cancelReservation = () => {
    // TODO Call the api and set isActive to false. Update styling.
    onClose();
  }

  return (
    <>
      <Modal show={open} size="md" onClose={onClose} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            {/*<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />*/}
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to cancel this reservation?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={cancelReservation}>
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