import Swal from "sweetalert2";
import { AxiosError } from "axios"; // ✅ Import AxiosError for better error handling

const asyncHandler = <T extends unknown[]>(
    fn: (...args: T) => Promise<void>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return async (...args: T) => {
        try {
            if (setLoading) setLoading(true);
            await fn(...args);
        } catch (error: unknown) { // ✅ Use `unknown` instead of `any`
            console.error("Error:", error);

            if (error instanceof AxiosError) { // ✅ Type-safe check for Axios errors
                if (error.response?.status === 201) {
                    console.log("Backend Message:", error.response.data.message);
                    return;
                }
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                    text: error.response?.data?.message || "An unexpected error occurred. Please try again.",
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An unexpected error occurred.",
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                });
            }
        } finally {
            if (setLoading) setLoading(false);
        }
    };
};

export default asyncHandler;
