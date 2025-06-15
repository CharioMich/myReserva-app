const RegisterFooter = () => {
  return (
    <footer className="shadow-sm sticky top-[100vh]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <hr className="my-3 border-gray-400 sm:mx-auto lg:my-4"/>
        <span className="block pt-2 text-md text-gray-600 sm:text-center"
        >
          &copy; {new Date().getFullYear()} <a href="/" className="hover:underline">myReserva™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default RegisterFooter