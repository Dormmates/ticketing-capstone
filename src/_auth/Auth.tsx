import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Auth = () => {
  const { auth } = useAuthContext();

  if (!auth.user || !auth.token) {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};

export default Auth;
