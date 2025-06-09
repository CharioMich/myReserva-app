
import { Navbar, NavbarBrand } from "flowbite-react";

export default function RegisterNav() {
  return (
    <nav className="fixed top-0 start-0 z-50 w-screen ">
      <Navbar className="py-3 bg-linear-to-r from-gray-700 to-gray-800 text-white">
        <NavbarBrand href="/">
          <img src="/calendar.png" className="mr-2 h-6 sm:h-9" alt="App Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white">myReserva</span>
        </NavbarBrand>

      </Navbar>
    </nav>

  );
}
