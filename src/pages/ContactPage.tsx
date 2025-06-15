import type { FooterProps } from "../types/types.ts";
import {useEffect} from "react";
import {Mail, Phone, MapPin} from 'lucide-react';

const ContactPage = ({footer}: FooterProps) => {

  useEffect(() => {
    document.title = "myReserva | Contact";
  }, []);

  return (
    <>
      <section className="flex flex-col p-5 space-y-6 justify-center items-center bg-gradient-to-r from-pink-400 to-orange-100 min-h-[100vh]">
        <h1 className="mt-16 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">Contact <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-orange-400">Us</span></h1>

        <p className="text-lg font-normal text-center text-gray-700 lg:text-xl">
          Have questions, suggestions, or need support? We’d love to hear from you.
        </p>

        <div className="flex flex-col items-center space-y-2 text-center">
          <p className="text-md text-gray-600 "><div className="flex flex-row items-center space-x-1"><Mail /> Email:&nbsp;<a href="mailto:support@myreserva.com" className="text-blue-500 hover:underline">support@myreserva.com</a></div> </p>
          <p className="text-md text-gray-600 "><div className="flex flex-row items-center space-x-1"><Phone /> Phone:&nbsp;<a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a></div> </p>
          <p className="text-md text-gray-600 "><div className="flex flex-row items-center space-x-1"><MapPin /> Location: 123 Main St, Your City, Your Country</div> </p>
        </div>

        <button
          className="relative hover:cursor-pointer inline-flex items-center justify-center p-0.5 mt-10 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-400 to-orange-500 group-hover:from-pink-400 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-orange-400"
        >
      <a
        href="mailto:mpampisb@gmail.com"
        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
      >Send us an E-mail
      </a>
        </button>
        {footer}
      </section>
    </>
  )
}

export default ContactPage;