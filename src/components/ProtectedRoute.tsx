import {Navigate, Outlet} from "react-router";
import useAuth from "../hooks/useAuth.ts";

const ProtectedRoute = () => {

  const { accessToken } = useAuth();

  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet/>;
}

export default ProtectedRoute;