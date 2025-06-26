import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { User } from "../types/user";

interface AuthData {
  user: User | null;
  token: string | null;
}

interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

const Auth = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthData>(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null };
    } catch (err) {
      console.error("Failed to parse auth data:", err);
      return { user: null, token: null };
    }
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContextProvider;
