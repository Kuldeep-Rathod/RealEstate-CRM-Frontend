const asyncHandler = <T extends unknown[]>(
    fn: (...args: T) => Promise<void>
) => {
    return async (...args: T) => {
        try {
            await fn(...args);
        } catch (error) {
            console.error("Error:", error);

            // Optional: Use a toast or alert system if available
            if (typeof window !== "undefined") {
                import("sweetalert2").then((Swal) => {
                    Swal.default.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: "An unexpected error occurred. Please try again.",
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true,
                        position: "top-end",
                    });
                });
            }
        }
    };
};

export default asyncHandler;
