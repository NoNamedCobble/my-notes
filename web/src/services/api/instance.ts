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
    if (!error.response?.data) {
      error.response = { data: { message: "Something went wrong." } };
    }
    return Promise.reject(error);
  },
);
