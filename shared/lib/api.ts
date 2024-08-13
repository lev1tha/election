import axios from "axios";

const BASE_URL = "https://samagan5.pythonanywhere.com/api/v1/";

export const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
