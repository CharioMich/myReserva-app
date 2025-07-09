import {Navigate, Outlet} from "react-router";
import useAuth from "../hooks/useAuth.ts";
import { useLocation } from "react-router";

const ProtectedRoute = () => {

  const location = useLocation();

  const { accessToken, userDetails } = useAuth();

  if (
    userDetails?.role &&
    location.pathname === '/admin-dashboard' &&
    userDetails?.role !== 'admin'
  ) {
    console.log(userDetails?.role)
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    userDetails?.role &&
    location.pathname === '/user-dashboard' &&
    userDetails?.role !== 'user'
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet/>;
}

export default ProtectedRoute;