import {Button, Navbar, NavbarLink, NavbarBrand, NavbarCollapse, NavbarToggle} from "flowbite-react";
import {Link, useLocation} from "react-router";

export default function Nav() {

  const location = useLocation();
  const currentPath = location.pathname;

  const navLinkClass = "text-white hover:text-gray-700 active:text-red-400";

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
            active={currentPath === "/"}
            className={navLinkClass}
          >Home
          </NavbarLink>
          <NavbarLink
            href="/about"
            active={currentPath === "/about"}
            className={navLinkClass}
          >About
          </NavbarLink>
          <NavbarLink
            href="/contact"
            active={currentPath === "/contact"}
            className={navLinkClass}
          >Contact
          </NavbarLink>
          <NavbarLink
            href="/new-reservation"
            className={navLinkClass}
          >Util
          </NavbarLink>
          <NavbarLink
            href="/admin-dashboard"
            className={navLinkClass}
          >Util2
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </nav>

  );
}
