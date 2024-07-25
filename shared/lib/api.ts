import axios from "axios";

const BASE_URL = "https://samagan3.pythonanywhere.com/api/v1/";

export const $api = axios.create({
  baseURL: BASE_URL,
});

export const $token = localStorage.getItem("token");
