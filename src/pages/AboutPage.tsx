import type { FooterProps } from "../types/types.ts";

const AboutPage = ({footer}: FooterProps) => {
  return (
    <>
      <section className="flex flex-col p-5 space-y-6 justify-center items-center bg-gradient-to-r from-emerald-500 to-sky-100 min-h-[100vh]">
        <h1 className="mt-16 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">About <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">myReserva</span></h1>

        <p className="text-lg font-normal text-center text-gray-700 lg:text-xl dark:text-gray-600 max-w-3xl">
          myReserva is designed to simplify the reservation process for small businesses and professionals.
          Whether you run a barbershop, beauty salon, or a service-based business, we help you connect with your clients,
          streamline your scheduling, and reduce no-shows — all from one easy-to-use platform.
        </p>

        <p className="text-lg font-normal text-center text-gray-700 lg:text-xl dark:text-gray-600 max-w-3xl">
          Our goal is to empower business owners to focus on what they do best, while we take care of appointment logistics.
          Fast, reliable, and built for the modern world.
        </p>
        {footer}
      </section>
    </>
  )
}

export default AboutPage;