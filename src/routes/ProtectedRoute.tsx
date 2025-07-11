import { type ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import type { UserRole } from "../types/user";

interface Props {
  children: ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuthContext();

  const isValidUser = user && allowedRoles.includes(user.role);

  if (!isValidUser) {
    return <Navigate to="/unathorized" />;
  }

  return children;
};

export default ProtectedRoute;
