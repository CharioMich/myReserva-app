import RegisterNav from "./RegisterNav.tsx";
import RegisterFooter from "./RegisterFooter.tsx";
import {Outlet} from "react-router";

const RouterLayoutRegister = () => {
  return (
    <>
      <div className="flex flex-col max-h-[100vh] min-h-[100vh]">
        <RegisterNav />
        <main className="flex-grow">
          <Outlet />
        </main>
        <RegisterFooter />
      </div>
    </>
  )
}

export default RouterLayoutRegister;