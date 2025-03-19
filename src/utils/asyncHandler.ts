import Swal from "sweetalert2";

const asyncHandler = <T extends unknown[]>(
    fn: (...args: T) => Promise<void>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return async (...args: T) => {
        try {
            if (setLoading) setLoading(true);
            await fn(...args);
        } catch (error) {
            console.error("Error:", error);
            if (typeof window !== "undefined") {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                    text: "An unexpected error occurred. Please try again.",
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
