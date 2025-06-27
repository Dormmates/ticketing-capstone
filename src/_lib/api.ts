import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

type RequestType = "get" | "post" | "delete" | "postFormData" | "postWithoutToken" | "postFormDataWithoutToken";

export const request = async <T>(
  endpoint: string,
  data: any = {},
  type: RequestType,
  configs: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
  const token = localStorage.getItem("authToken");

  const isForm = type.includes("FormData");
  const requiresAuth = !type.includes("WithoutToken");

  const headers: AxiosRequestConfig["headers"] = {
    ...(isForm ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
    ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...configs.headers,
  };

  const config: AxiosRequestConfig = {
    url: endpoint,
    method: type === "get" ? "get" : type === "delete" ? "delete" : "post",
    headers,
    ...configs,
  };

  if (type === "get") {
    config.params = data;
  } else {
    config.data = data;
  }

  return await axios<T>(config);
};
