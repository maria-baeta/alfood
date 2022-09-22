import axios from "axios";

export const clientV1 = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export const clientV2 = axios.create({
  baseURL: "http://localhost:8000/api/v2/",
});
