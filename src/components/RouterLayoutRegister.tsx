import RegisterNav from "./RegisterNav.tsx";
import RegisterFooter from "./RegisterFooter.tsx";
import {Outlet} from "react-router";

const RouterLayoutRegister = () => {
  return (
    <>
      <RegisterNav />
        <Outlet />
      <RegisterFooter />
    </>
  )
}

export default RouterLayoutRegister;