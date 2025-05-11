import axios, { AxiosError } from "axios";
import { CREDIT_CARD_API_BASE_URL } from "../config";
import type { ApiError } from "../models/generic-models";

const api = axios.create({
  baseURL: CREDIT_CARD_API_BASE_URL
});

// Interceptor para agregar token Bearer en cada solicitud
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas exitosas
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ApiError>) => {
    let mensaje = 'Ocurrió un error inesperado.';

    if (error.response?.data?.message) {
      mensaje = error.response.data.message;
    }

    return Promise.reject(new Error(mensaje));
  }
);

export default api;
