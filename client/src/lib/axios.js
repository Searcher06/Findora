import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const Api2 = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
