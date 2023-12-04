import axios, { isAxiosError } from "axios";
import { toastEmmiter } from "../utils/toastEmitter";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST_URL,
  withCredentials: true,
});

const requestAPI = async <R, P = void>(
  url: string,
  method: string,
  payload?: P,
  emitError?: boolean
) => {
  try {
    const response = await api.request<R>({ method, url, data: payload });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
      if (emitError) {
        toastEmmiter(error.message, "error");
      }
    }
  }
};

export default requestAPI;
