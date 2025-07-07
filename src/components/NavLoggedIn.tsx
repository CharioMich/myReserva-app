import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import {Link, useNavigate ,useLocation} from "react-router";
import {useEffect, useState} from "react";

import useAuth from "../hooks/useAuth.ts";


export default function NavLoggedIn() {

  const { logoutUser, userDetails } = useAuth();
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");

  useEffect(() => {
    setName(userDetails?.username);
    setEmail(userDetails?.email);
  }, [userDetails]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  }

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const dropItemStyle: string = 'font-semibold text-gray-600'

  return (
    <nav className="fixed top-0 start-0 z-50 w-screen ">
      <Navbar className="bg-gradient-to-b from-gray-700 to-gray-800 text-white"  >
        <NavbarBrand href="/">
          <img src="/calendar.png" className="mr-2 h-6 sm:h-9" alt="App Logo" />
          <span className="self-center whitespace-nowrap text-white text-xl font-semibold">myReserva</span>
        </NavbarBrand>
        <div className="flex md:order-2 space-x-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Hello, <span className="text-sky-600">{name}</span>!</span>
              <span className="block truncate text-sm font-medium">{email}</span>
            </DropdownHeader>
            <DropdownItem className={dropItemStyle} as={Link} to={'/user-dashboard'}>Dashboard</DropdownItem>
            <DropdownItem className={dropItemStyle} as={Link} to={'/new-reservation'}>New Reservation</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout} className="font-semibold text-red-400 hover:text-red-500">Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse className="pr-40">
          {/* Padding right 40 to match Nav's (not logged in) NavbarLinks positioning (Home, About...) */}
          <NavbarLink
            href="/"
            active={currentPath === "/"}
            className="text-white hover:text-gray-700"
          >Home
          </NavbarLink>
          <NavbarLink
            href="/about"
            active={currentPath === "/about"}
            className="text-white hover:text-gray-700"
          >About
          </NavbarLink>
          <NavbarLink
            href="/contact"
            active={currentPath === "/contact"}
            className="text-white hover:text-gray-700"
          >Contact
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </nav>
  );
}
