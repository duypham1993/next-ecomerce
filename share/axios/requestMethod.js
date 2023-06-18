import axios from "axios";
import {
  clearLocalStorage,
  getLocalAccessToken,
} from "@/services/localStorage";
import { refreshToken } from "@/services/refreshToken";

// const URL_API = "https://api-balanh.onrender.com/api";
const URL_API = process.env.URL_API;
let refreshTokenPromise = null;

export const publicRequest = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const privateRequest = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

privateRequest.interceptors.request.use(
  (config) => {
    if (!config.headers["accesstoken"]) {
      config.headers["accesstoken"] = `Bearer ${getLocalAccessToken()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

privateRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    const prevRequestConfig = error?.config;
    if (error?.response?.status === 403 && error?.response?.data === "logout") {
      clearLocalStorage();
      return;
    }

    if (error?.response?.status === 401 && !prevRequestConfig.sent) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken().then((token) => {
          refreshTokenPromise = null;
          return token;
        });
      }

      return refreshTokenPromise.then((token) => {
        return privateRequest({
          ...prevRequestConfig,
          headers: {
            ...prevRequestConfig.headers,
            accesstoken: `Bearer ${token}`,
            sent: true,
          },
        });
      });
    }

    return Promise.reject(error);
  }
);

export default privateRequest;
