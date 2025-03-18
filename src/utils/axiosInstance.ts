import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: SERVER_URL,  // Define base URL
    withCredentials: true,  // Include credentials (cookies)
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Authorization Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
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

        // Optional: Handle Unauthorized Access (401)
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
