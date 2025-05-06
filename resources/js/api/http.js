import router from "@/router";
import useAuthService from "@/services/useAuthService";
import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
// const { token, removeLocalStorage } = useAuthService();

function successRequest(config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

function successResponse(config) {
    return config;
}

function errorResponse(error) {
    return Promise.reject(error);
}

http.interceptors.request.use(successRequest);
http.interceptors.response.use(successResponse, errorResponse);

export default http;
