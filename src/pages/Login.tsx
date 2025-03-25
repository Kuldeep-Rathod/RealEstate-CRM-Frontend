import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import asyncHandler from "../utils/asyncHandler";
import { storeToken } from "../utils/auth";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = asyncHandler(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const response = await axiosInstance.post("/auth/login", {
            email,
            password,
        });

        const data = response.data;

        if (response.status !== 200) {
            throw new Error(data.message || "Login failed");
        }

        // Store authToken for 8 hours
        storeToken(data.authToken, 8);

        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "Welcome back!",
            timer: 1500,
            showConfirmButton: false,
        });
        navigate("/contacts");
    }, setLoading);

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-button login-button"
                >
                    {loading ? <span className="spinner"></span> : "Login"}
                </button>
                <p>
                    don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
