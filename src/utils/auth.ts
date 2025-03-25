export const storeToken = (authToken: string, durationInMinutes: number = 10) => {
    const expiresAt = Date.now() + durationInMinutes * 60 * 1000; // ✅ Fix duration calculation
    localStorage.setItem("authToken", JSON.stringify({ authToken, expiresAt }));
};

export const getToken = () => {
    const storedData = localStorage.getItem("authToken");
    if (!storedData) return null;

    try {
        const { authToken, expiresAt } = JSON.parse(storedData);
        
        if (Date.now() > expiresAt) {
            localStorage.removeItem("authToken"); // Remove expired token
            console.log("Token expired and removed");
            return null;
        }

        return authToken; // ✅ Return plain string (not JSON)
    } catch (error) {
        console.error("Invalid token format:", error);
        localStorage.removeItem("authToken"); // Remove corrupted token
        return null;
    }
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
};
