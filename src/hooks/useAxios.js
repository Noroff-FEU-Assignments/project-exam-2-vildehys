import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../constants/Api";

export default function useAxios() {
  const [auth] = useContext(AuthContext);
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.accessToken;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
