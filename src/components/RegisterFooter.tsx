import type {bgProps} from "../types/types.ts";

const RegisterFooter = ({bg}: bgProps) => {
  return (
    <footer className={"shadow-sm sticky top-[100vh] " + bg}>
      <div className={"w-full mx-auto p-4 py-6 " + bg}>
        <hr className="my-3 border-gray-400 lg:my-4"/>
        <span className="block pt-2 text-md text-gray-600 text-center"
        >
          &copy; {new Date().getFullYear()} <a href="/" className="hover:underline">myReserva™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default RegisterFooter