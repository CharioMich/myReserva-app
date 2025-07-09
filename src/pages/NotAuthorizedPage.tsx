import { Link } from 'react-router';
import { Button } from "flowbite-react";

const ForbiddenPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white px-6 text-center">
      <img
        src="https://puns.co/wp-content/uploads/2024/02/Beagle-eyed-detective-on-the-scent-Beagle-Pun.webp"
        alt="Detective Dog"
        className="w-64 mb-8"
      />
      <h1 className="text-5xl font-bold mb-4 text-red-500">403: Caught Red-Handed!</h1>
      <p className="text-lg mb-6 max-w-xl">
        🕵️‍♂️ Detective Dog Dev caught you trying to sneak into a restricted area!<br />
        Only authorized personnel beyond this point. <br />
        Don't worry — we won't call the Internet Police... this time.
      </p>
      <Button
        as={Link}
        to="/"
        className="min-w-[15%] max-w-[20%] py-7 font-bold mx-auto bg-gradient-to-br from-pink-500 to-orange-400 text-white hover:bg-gradient-to-l focus:ring-purple-200 hover:shadow-xl">
        🏃‍♂️ Retreat to Safety
      </Button>
    </div>
  );
};

export default ForbiddenPage;
