import axios, { isAxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST_URL,
  withCredentials: true,
});

const requestAPI = async <R, P = void>(
  url: string,
  method: string,
  payload?: P
) => {
  try {
    const response = await api.request<R>({ method, url, data: payload });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    }
  }
};

export default requestAPI;
