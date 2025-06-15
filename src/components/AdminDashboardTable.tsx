
import { Datepicker ,Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import {useEffect, useState} from "react";
import {TextModal} from "./TextModal.tsx";

export function AdminDashboardTable() {

  useEffect(() => {
    document.title = "myReserva | Dashboard";
  }, []);

  const onClose = () => {
    setOpenModal(false);
  }

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-5xl h-[70vh] bg-blue-100 mt-20 overflow-x-auto w-full m-auto rounded-2xl p-2 border border-gray-300 shadow">
      <TextModal open={openModal} onClose={onClose} />
      <Datepicker className="mb-2 font-bold" />
      <Table>
        <TableHead>
          {/**/}
          <TableRow className="bg-gradient-to-r from-cyan-200 to-emerald-300">
            <TableHeadCell className="bg-transparent">Full Name</TableHeadCell>
            <TableHeadCell className="bg-transparent">Phone No.</TableHeadCell>
            <TableHeadCell className="bg-transparent">E-mail</TableHeadCell>
            <TableHeadCell className="bg-transparent">Time</TableHeadCell>
            <TableHeadCell className="bg-transparent">Text</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <button onClick={() => setOpenModal(true)} className="font-medium text-primary-500 hover:underline hover:text-primary-600">
                View Text
              </button>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-blue-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                View Text
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                View Text
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                View Text
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                View Text
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                View Text
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Charalampos Michalakis
            </TableCell>
            <TableCell>+30 123266054</TableCell>
            <TableCell>mpampisb@aueb.com</TableCell>
            <TableCell className="font-medium text-gray-900">16:40</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                View Text
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900">
              Microsoft Surface Pro
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>
            </TableCell>
          </TableRow>
          <TableRow className="border-gray-700 bg-gray-100">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 ">Magic Mouse 2</TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
