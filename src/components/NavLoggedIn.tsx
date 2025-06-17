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
// import {Link} from "react-router";

export default function NavLoggedIn() {

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
              <span className="block text-sm">Johnny Doe</span>
              <span className="block truncate text-sm font-medium">name@myReserva.com</span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownDivider />
            <DropdownItem className="font-semibold text-red-400 hover:text-red-500">Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
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
            href="/user-dashboard"
            className="text-white hover:text-gray-700"
          >Util2
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </nav>
  );
}
