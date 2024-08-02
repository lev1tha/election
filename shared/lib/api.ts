import axios from "axios";

const BASE_URL = "https://samagan3.pythonanywhere.com/api/v1/";
const $token = localStorage.getItem("token");

export const $api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Token 775d3d2b5cec99730619f8276f12e18530bcf2f5`,
  },
});
