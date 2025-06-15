import { Button } from "flowbite-react";
import {useEffect} from "react";
import {Link} from "react-router";

const NotFoundPage = () => {

  useEffect(() => {
    document.title = "Error 404. Page not found";
  }, []);

  return (
    <>
      <div className="text-center space-y-8 py-30">
        <h1 className="text-9xl font-bold text-red-700">404</h1>
        <p className="text-4xl font-semibold text-gray-700">Page not found :(</p>
        <p className="text-lg text-gray-700 italic">You may have lost your way temporarily, but do not lose sight of what matters most...</p>
        <Button
          as={Link}
          to="/"
          className="min-w-[15%] max-w-[20%] py-7 font-bold mx-auto bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-l focus:ring-purple-200 hover:shadow-xl">
          Back to myReserva
        </Button>
      </div>

    </>
  )
}

export default NotFoundPage;