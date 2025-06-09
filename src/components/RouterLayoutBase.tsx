import {Outlet} from "react-router";
import Nav from "./Nav.tsx";
// import Footer from "./Footer.tsx";

const RouterLayoutBase = () => {
  return (
    <div className="flex flex-col max-h-[100vh] min-h-[100vh]">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/*<Footer />*/}
    </div>
  )
}

export default RouterLayoutBase;