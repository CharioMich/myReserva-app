import './App.css'

// To disable Dark mode for a seamless UI -> <ThemeConfig dark={false} />
import { ThemeConfig } from "flowbite-react";

import {BrowserRouter, Route, Routes} from "react-router";
import RouterLayoutBase from "./components/RouterLayoutBase.tsx";
import RouterLayoutRegister from "./components/RouterLayoutRegister.tsx";
import Home from "./pages/Home.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Footer from "./components/Footer.tsx";
import ReservationPage from "./pages/ReservationPage.tsx";
import RegisterFooter from "./components/RegisterFooter.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import RouterLayoutLoggedIn from "./components/RouterLayoutLoggedIn.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";
import UserDashboardPage from "./pages/UserDashboardPage.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotAuthorizedPage from "./pages/NotAuthorizedPage.tsx";
import {Toaster} from "sonner";

function App() {

  return (
    <>
    <AuthProvider>
      <ThemeConfig dark={false} />
      <BrowserRouter>
        <Routes>

          <Route element={<RouterLayoutBase />} >
            <Route index element={<Home footer={ <Footer/> }/>} />
            <Route path="/about" element={<AboutPage footer={ <Footer/> }/>} />
            <Route path="/contact" element={<ContactPage footer={ <Footer/> }/>} />
          </Route>

          <Route element={<RouterLayoutRegister />} >
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
          </Route>

          <Route path="/" element={<ProtectedRoute />} >
            <Route element={<RouterLayoutLoggedIn />} >
              <Route path="/new-reservation" element={<ReservationPage footer={ <RegisterFooter/> }/>} />
              <Route path="/admin-dashboard" element={<AdminDashboardPage footer={ <RegisterFooter/> }/>} />
              <Route path="/user-dashboard" element={<UserDashboardPage footer={<RegisterFooter bg={"bg-gray-800"} />} />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/unauthorized" element={<NotAuthorizedPage />} />
        </Routes>

        <Toaster richColors />
      </BrowserRouter>
    </AuthProvider>

    </>
  )
}

export default App
