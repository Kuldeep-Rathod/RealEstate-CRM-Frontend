import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>Home</h1>
            <button
                style={{ marginRight: "10px" }}
                onClick={() => navigate("/login")}
            >
                Login
            </button>
            <button
                style={{ marginRight: "10px" }}
                onClick={() => navigate("/register")}
            >
                Register
            </button>
        </>
    );
};

export default Home;
