import {useEffect} from "react";
import {Link} from "react-router";

const NotFoundPage = () => {

  useEffect(() => {
    document.title = "Error 404. Page not found";
  }, []);

  return (
    <>
      <div className="text-center space-y-6 py-36">
        <h1 className="text-9xl font-bold text-red-800">404</h1>
        <p className="text-4xl text-black">Page not found :(</p>
        <p className="text-lg text-gray-700">The page you are looking for does not exist.</p>
        <Link to="/" className="bg-sky-500 text-white rounded px-4 py-2 my-4 hover:bg-sky-600 ">
          Back to Home
        </Link>
      </div>

    </>
  )
}

export default NotFoundPage;