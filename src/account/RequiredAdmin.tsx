import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../UserContext";

function RequireAdmin() {
  const { user } = useUserContext();
  if (!user) return <Navigate to="/signin" replace />;
  if (!user.isAdmin) return <Navigate to="/requests" replace />;
  return <Outlet />;
}

export default RequireAdmin;