import {Outlet} from "react-router";
import NavLoggedIn from "./NavLoggedIn.tsx";
// import Footer from "./Footer.tsx";

const RouterLayoutBase = () => {
  return (
    <div className="flex flex-col max-h-[100vh] min-h-[100vh]">
      <NavLoggedIn />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/*<Footer />*/}
    </div>
  )
}

export default RouterLayoutBase;