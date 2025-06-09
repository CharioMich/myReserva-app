const Footer = () => {
  return (
    <footer className="w-full max-w-screen-xl mx-auto sticky top-[100vh]">
      <div className="">
        <hr className="border-gray-300 opacity-50 mx-auto"/>
        <span className="block py-3 text-md text-gray-200 "
        >
          &copy; {new Date().getFullYear()} <a href="/" className="text-sky-200 hover:underline">myReserva™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer