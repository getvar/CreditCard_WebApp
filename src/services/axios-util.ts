import axios, { AxiosError } from "axios";
import { CREDIT_CARD_API_BASE_URL } from "../config";
import type { ApiError } from "../models/generic-models";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: CREDIT_CARD_API_BASE_URL
});

// Interceptor para agregar token Bearer en cada solicitud
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('creditCardToken');
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
    let message = 'Ocurrió un error en el proceso.';
    const status = error.response?.status;
    const data = error.response?.data;
    
    if (status === 401) {
      window.location.href = '/Login';
    }

    if (status === 400 && data?.errors) {
      const messages = Object.values(data.errors).flat().join('\n');
      message = messages || message;
    } else if (data?.message) {
      message = data.message;
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
