import { useState, useRef, FormEvent, JSX } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import asyncHandler from "../utils/asyncHandler";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import "../styles/_otp.scss";
import axios, { AxiosError } from "axios";

export const VerifyOtp = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const [error, setError] = useState<string | JSX.Element>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const email: string = searchParams.get("email") || "";

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = asyncHandler(async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!email) {
            setError(
                <span>
                    Email not found. Please{" "}
                    <a
                        href="/register"
                        style={{ color: "blue", textDecoration: "underline" }}
                    >
                        register again
                    </a>
                    .
                </span>
            );
            setLoading(false);
            return;
        }

        const otpValue: string = otp.join("");
        if (otpValue.length !== 4) {
            setError("OTP must be 4 digits.");
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post("/auth/verify-otp", {
                email,
                otp: otpValue,
            });

            Swal.fire({
                icon: "success",
                title: "OTP Verified!",
                text: response.data.message,
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/contacts");
        } catch (err: AxiosError | unknown) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "OTP verification failed."
                );
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    });

    return (
        <div className="otp-container">
            <h2>Enter OTP</h2>
            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        className="otp-input"
                    />
                ))}
            </div>
            {error && <p className="error-text">{error}</p>}
            <button
                onClick={handleVerify}
                disabled={otp.join("").length !== 4 || loading}
                className="verify-button"
            >
                {loading ? "Verifying..." : "Verify OTP"}
            </button>
        </div>
    );
};
