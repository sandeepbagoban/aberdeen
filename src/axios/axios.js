import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:44389/',
  timeout: 10000
});


// axiosInstance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("Token");
//   config.headers.Authorization = 'Bearer '+ token;

//   return config;
// });