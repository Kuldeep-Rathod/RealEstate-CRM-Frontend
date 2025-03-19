import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import asyncHandler from "../utils/asyncHandler";
import Sidebar from "../components/Sidebar";

const UploadCSV: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = asyncHandler(async () => {
        if (!file) {
            setError("Please select a CSV file.");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(
            "/leads/uploadFile",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        Swal.fire({
            icon: "success",
            title: "Upload Successful",
            text: response.data.message,
            timer: 2000,
            showConfirmButton: false,
        });

        setFile(null);
    }, setLoading);

    return (
        <div className="upload-container">
            <Sidebar />

            <h2>Upload Leads CSV</h2>

            {error && <p className="error">{error}</p>}

            <div className="file-input">
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>

            <button onClick={handleUpload} disabled={loading || !file}>
                {loading ? <span className="spinner"></span> : "Upload"}
            </button>
        </div>
    );
};

export default UploadCSV;
