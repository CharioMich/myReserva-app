const Footer = () => {
  return (


    <footer className="shadow-sm sticky top-[100vh]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
        <span className="block text-md text-gray-600 sm:text-center dark:text-gray-500"
        >
          &copy; {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">myReserva™</a>. All Rights Reserved.</span>
      </div>
    </footer>


    // <footer className="px-4 py-4 text-center bg-gray-400 sticky top-[100vh]">
    //   Copyright &copy; {new Date().getFullYear()} All rights Reserved.
    // </footer>
  )
}

export default Footer