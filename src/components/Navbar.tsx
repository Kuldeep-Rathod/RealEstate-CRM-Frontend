import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove the authToken from local storage
        navigate("/login"); // Redirect to the login page
    };

    return (
        <nav className="navbar">
            <button className="nav-button" onClick={() => navigate("/contacts")}>
                All Leads
            </button>
            <button className="nav-button" onClick={() => navigate("/upload-csv")}>
                Upload Leads
            </button>
            <button className="nav-button" onClick={() => handleLogout()}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
