import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes() {
  const { user, isAuth, token } = useAuth();

  if (!isAuth && !token) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
