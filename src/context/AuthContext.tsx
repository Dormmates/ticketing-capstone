import { createContext, useContext, useEffect, useState, type ReactNode, type SetStateAction } from "react";
import { useGetUserInformation } from "../_lib/@react-client-query/auth";
import type { Distributor, User } from "../types/user";

type AuthContextData = {
  user: User | Distributor | null;
  setUser: React.Dispatch<SetStateAction<User | Distributor | null>>;
  isLoadingUser: boolean;
  isDistributor: boolean;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | Distributor | null>(null);
  const { data, isSuccess, isLoading } = useGetUserInformation({
    enabled: user === null,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data]);

  const isDistributor = user ? "distributorTypeId" in user : false;

  return <AuthContext.Provider value={{ user, setUser, isLoadingUser: isLoading, isDistributor }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
