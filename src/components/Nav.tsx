import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import {Link} from "react-router";
import CustomNavbarLink from "./CustomNavbarLink.tsx";

export default function Nav() {
  return (
    <nav className="fixed top-0 start-0 z-50 w-screen ">
      <Navbar className="bg-linear-to-r from-gray-700 to-gray-800 text-white"  >
        <NavbarBrand href="/">
          {/*<img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="App Logo" />*/}
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
          <CustomNavbarLink to={"/"} text={"Home"} />
          <CustomNavbarLink to={"/about"} text={"About"} />
          <CustomNavbarLink to={"/new-reservation"} text={"Util"} />
          <CustomNavbarLink to={"/contact"} text={"Contact"} />
          {/*<NavbarLink className="text-white hover:text-gray-700">*/}
          {/*  <Link to="/contact">Contact</Link>*/}
          {/*</NavbarLink>*/}
        </NavbarCollapse>
      </Navbar>
    </nav>

  );
}
