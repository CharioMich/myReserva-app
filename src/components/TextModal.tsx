
"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { type ModalComponentProps } from "../types/types.ts";


export function TextModal({ open, onClose, text }: ModalComponentProps) {

  return (
    <>
      <Modal show={open} onClose={onClose}>
        <ModalHeader>Additional Info</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {text}
            </p>
          </div>
        </ModalBody>
        {/*<ModalFooter>*/}
        {/*  <Button onClick={() => setOpenModal(false)}>I accept</Button>*/}
        {/*  <Button color="alternative" onClick={() => setOpenModal(false)}>*/}
        {/*    Decline*/}
        {/*  </Button>*/}
        {/*</ModalFooter>*/}
      </Modal>
    </>
  );
}
