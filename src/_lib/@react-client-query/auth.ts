import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../api";
import type { Distributor, User } from "../../types/user";

interface LoginPayload {
  email: string;
  password: string;
  expectedRole: string;
}

export const useLogin = () => {
  return useMutation<User | Distributor, Error, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      const res = await request<User | Distributor>("/api/auth/Login", data, "post");
      return res.data;
    },
    retry: false,
  });
};

export const useGetUserInformation = (options?: any) => {
  return useQuery<User | Distributor, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await request<User | Distributor>("/api/auth/getUserInformation", {}, "get");
      return res.data;
    },
    retry: false,
    ...options,
  });
};
