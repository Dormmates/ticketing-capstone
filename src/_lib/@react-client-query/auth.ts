import { useMutation } from "@tanstack/react-query";
import type { User } from "../../types/user";
import { request } from "../api";

interface LoginPayload {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await request<User>("/api/login", data, "postFormDataWithoutToken");
      return res.data;
    },
  });
};
