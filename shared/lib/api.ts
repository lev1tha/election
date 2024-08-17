import axios from "axios";

interface DataT {
  [key: string]: string
}

export const BASE_URL = "https://samagan5.pythonanywhere.com";

export const $api = axios.create({
  baseURL: BASE_URL + '/api/v1/',
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
