import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
