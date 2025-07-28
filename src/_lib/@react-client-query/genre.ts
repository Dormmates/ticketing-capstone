import { useQuery } from "@tanstack/react-query";
import { request } from "../api";

export const useGetGenres = () => {
  return useQuery<{ genres: { name: string }[] }, Error>({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await request<{ genres: { name: string }[] }>("/api/genres", {}, "get");
      return res.data;
    },
    retry: false,
  });
};
