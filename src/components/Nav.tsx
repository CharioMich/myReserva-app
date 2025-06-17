import {Button, Navbar, NavbarLink, NavbarBrand, NavbarCollapse, NavbarToggle} from "flowbite-react";
import {Link} from "react-router";

export default function Nav() {

  return (
    <nav className="fixed top-0 start-0 z-50 w-screen ">
      <Navbar className="bg-gradient-to-b from-gray-700 to-gray-800 text-white"  >
        <NavbarBrand href="/">
          <img src="/calendar.png" className="mr-2 h-6 sm:h-9" alt="App Logo" />
          <span className="self-center whitespace-nowrap text-white text-xl font-semibold">myReserva</span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button
            as={Link}
            to="/login"
            className="mr-2 hover:cursor-pointer" color="alternative" pill>
            Log In
          </Button>
          <Button
            as={Link}
            to="/register"
            className="hover:cursor-pointer mr-2 bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-bl focus:ring-pink-200 dark:focus:ring-pink-800">
            Get Started
          </Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          {/*<Link*/}
          {/*  to="/contact"*/}
          {/*>Contact</Link>*/}
          <NavbarLink
            href="/"
            className="text-white hover:text-gray-700"
          >Home
          </NavbarLink>
          <NavbarLink
            href="/about"
            className="text-white hover:text-gray-700"
          >About
          </NavbarLink>
          <NavbarLink
            href="/contact"
            className="text-white hover:text-gray-700"
          >Contact
          </NavbarLink>
          <NavbarLink
            href="/new-reservation"
            className="text-white hover:text-gray-700"
          >Util
          </NavbarLink>
          <NavbarLink
            href="/admin-dashboard"
            className="text-white hover:text-gray-700"
          >Util2
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </nav>

  );
}
