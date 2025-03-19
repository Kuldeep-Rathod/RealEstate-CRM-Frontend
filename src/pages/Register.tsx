import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import asyncHandler from "../utils/asyncHandler";

const Register: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = asyncHandler(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        console.log("Sending Data:", { name, email, password });

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const response = await axiosInstance.post("/auth/register", {
            name,
            email,
            password,
            confirmPassword,
        });

        const data = response.data;

        console.log(data);

        if (response.status !== 201) {
            throw new Error(data.message || "Registration failed");
        }

        localStorage.setItem("token", data.token);

        Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Welcome to Lead Manager!",
            timer: 1500,
            showConfirmButton: false,
        });

        navigate("/contacts");
    }, setLoading);

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>

                {error && <p className="error">{error}</p>}

                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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

                <div className="input-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="register-button">
                    {loading ? <span className="spinner"></span> : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
