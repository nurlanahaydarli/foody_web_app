import axios, {AxiosError, AxiosInstance} from "axios";

export const instanceAxios: AxiosInstance = axios.create({
    baseURL: "/api/",
});

instanceAxios.interceptors.request.use(
    (config) => {
        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);