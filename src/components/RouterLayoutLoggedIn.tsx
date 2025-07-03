import {Outlet} from "react-router";
import NavLoggedIn from "./NavLoggedIn.tsx";
// import RegisterFooter from "./RegisterFooter.tsx";


const RouterLayoutBase = () => {
  return (
    <div className="flex flex-col h-[100vh]">
      <NavLoggedIn />
      <main className="h-[100vh]">
        <Outlet />
      </main>
    </div>
  )
}

export default RouterLayoutBase;