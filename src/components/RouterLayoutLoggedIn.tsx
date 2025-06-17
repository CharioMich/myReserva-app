import {Outlet} from "react-router";
import NavLoggedIn from "./NavLoggedIn.tsx";
// import RegisterFooter from "./RegisterFooter.tsx";


const RouterLayoutBase = () => {
  return (
    <div className="flex flex-col max-h-[100vh] min-h-[100vh]">
      <NavLoggedIn />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RouterLayoutBase;