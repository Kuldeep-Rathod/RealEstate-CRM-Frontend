import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import asyncHandler from "../utils/asyncHandler";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";

export const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // 🔹 Get email from URL query parameters
    const email = searchParams.get("email") || "";

    const handleChange = (newValue: string) => {
        setOtp(newValue);
        setError(""); // Clear error on input change
    };

    const handleVerify = asyncHandler(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!email) {
            setError("Email not found. Please register again.");
            setLoading(false);
            return;
        }

        if (otp.length !== 4) {
            setError("OTP must be 6 digits.");
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post("/auth/verify-otp", { email, otp });

            Swal.fire({
                icon: "success",
                title: "OTP Verified!",
                text: response.data.message, // e.g., "OTP Verified Successfully"
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/contacts"); // Redirect on success
        } catch (err: any) {
            setError(err.response?.data?.message || "OTP verification failed.");
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className="otp-container">
            <h2>Enter OTP</h2>

            <MuiOtpInput value={otp} onChange={handleChange} length={4} />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleVerify} disabled={otp.length !== 4 || loading} className="verify-button">
                {loading ? "Verifying..." : "Verify OTP"}
            </button>
        </div>
    );
};
