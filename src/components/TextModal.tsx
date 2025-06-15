
"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";


interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
}


export function TextModal({ open, onClose }: ModalComponentProps) {

  return (
    <>
      <Modal show={open} onClose={onClose}>
        <ModalHeader>Client's Text</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Vestibulum ullamcorper gravida justo, vitae interdum quam rhoncus in. Nullam vestibulum nulla nec ex semper egestas. Phasellus vel egestas erat, in porttitor quam. In sit amet aliquam tortor. Duis pretium efficitur nunc ultrices semper. Aliquam suscipit sollicitudin magna, ut gravida libero. Donec sollicitudin erat ac metus feugiat interdum.
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
