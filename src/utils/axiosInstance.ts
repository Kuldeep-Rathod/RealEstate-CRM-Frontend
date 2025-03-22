import axios from "axios";
import { getToken, removeToken } from "./auth"; // Import utility functions

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Authorization Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken(); // Get valid token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Global Errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);

        // Handle Unauthorized Access (401)
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Removing token and redirecting...");
            removeToken(); // Remove token if invalid
            window.location.href = "/login"; // Redirect to login page
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
