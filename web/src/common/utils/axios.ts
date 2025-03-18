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
  data?: T | null;
  onError?: (err: any) => void;
};

const isSuccessfulResponse = (status: number) => status >= 200 && status <= 299;

export const callApi = async <T = any>({
  method,
  url,
  data,
  onError = () => {},
}: callApiProps<T>) => {
  try {
    const response = await api.request({
      url,
      method,
      data,
    });

    if (isSuccessfulResponse(response.status)) {
      return response;
    }
  } catch (err: any) {
    onError(err);
  }
};
