import {Outlet} from "react-router";
import Nav from "./Nav.tsx";
// import Footer from "./Footer.tsx";

import useAuth from "../hooks/useAuth.ts";
import NavLoggedIn from "./NavLoggedIn.tsx";

const RouterLayoutBase = () => {

  const {accessToken} = useAuth();

  return (
    <div className="flex flex-col max-h-[100vh] min-h-[100vh]">
      {accessToken ? (
        <NavLoggedIn />
      ) : (
        <Nav />
      )}

      <main>
        <Outlet />
      </main>
      {/*<Footer />*/}
    </div>
  )
}

export default RouterLayoutBase;