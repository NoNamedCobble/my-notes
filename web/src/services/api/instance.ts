import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const defaultErrorMessage = "Something went wrong. Please try again later.";
    const message = error.response?.data?.message ?? defaultErrorMessage;

    error.message = message;
    return Promise.reject(error);
  },
);
