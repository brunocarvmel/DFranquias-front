import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "any"
    }
});

export default api;