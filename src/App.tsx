import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadCSV from "./pages/UploadCSV";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload-csv" element={<UploadCSV />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
