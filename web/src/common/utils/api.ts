import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

type callApiProps<T> = {
  method: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
  data: T;
};
export const callApi = async <T>({ method, url, data }: callApiProps<T>) => {
  try {
    const response = await api.request({
      url,
      method,
      data,
    });

    return { success: true, data: response.data };
  } catch (err: any) {
    const message: string =
      err.response?.data?.message || "Something went wrong.";
    return { success: false, message };
  }
};
