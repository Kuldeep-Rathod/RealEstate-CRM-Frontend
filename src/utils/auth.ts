export const storeToken = (token: string, durationInMinutes: number = 1) => {
    const expiresAt = Date.now() + durationInMinutes * 60 * 60 * 1000; // Set expiration time
    localStorage.setItem("authToken", JSON.stringify({ token, expiresAt }));
};

export const getToken = () => {
    const storedData = localStorage.getItem("authToken");

    if (!storedData) return null;

    const { token, expiresAt } = JSON.parse(storedData);

    if (Date.now() > expiresAt) {
        localStorage.removeItem("authToken"); // Remove expired token
        console.log("Token expired and removed");
        return null;
    }

    return token;
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
};
