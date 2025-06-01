
const Home = () => (
  <>
    <section className="flex flex-col space-y-4 justify-center items-center bg-red-400 min-h-[100vh] ">
      <h1 className="mt-16 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"
      >Reservations Made Simple.
      </span> myReserva
      </h1>
      <p className="text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-600">Here at myReserva we focus on
        markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
      <button
        className="relative hover:cursor-pointer inline-flex items-center justify-center p-0.5 mt-10 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-sky-400"
        >
          <span
            className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
          > More About Us...
          </span>
      </button>
    </section>
  </>
)

export default Home;