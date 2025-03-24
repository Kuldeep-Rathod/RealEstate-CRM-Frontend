import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadCSV from "./pages/UploadCSV";
import Home from "./pages/Home";
// import { lazy } from "react";
import { VerifyOtp } from "./pages/VerifyOtp";

// //Admin Routes Importing
// const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
// const Customers = lazy(() => import("./pages/admin/Customers"));
// const Transaction = lazy(() => import("./pages/admin/Transaction"));
// const Products = lazy(() => import("./pages/admin/Products"));
// const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
// const ProductManagement = lazy(
//     () => import("./pages/admin/management/ProductManagement")
// );
// const TransactionManagement = lazy(
//     () => import("./pages/admin/management/TransactionManagement")
// );
// const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
// const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
// const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));
// const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));
// const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
// const Toss = lazy(() => import("./pages/admin/apps/Toss"));

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/upload-csv" element={<UploadCSV />} />

                {/* <Route path="*" element={<h1>404</h1>} /> */}

                {/*Admin Routes
                <Route>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/customers" element={<Customers />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route
                        path="/admin/transaction"
                        element={<Transaction />}
                    />
                    Charts
                    <Route path="/admin/chart/bar" element={<BarCharts />} />
                    <Route path="/admin/chart/pie" element={<PieCharts />} />
                    <Route path="/admin/chart/line" element={<LineCharts />} />

                    Apps
                    <Route
                        path="/admin/app/stopwatch"
                        element={<Stopwatch />}
                    />
                    <Route path="/admin/app/coupon" element={<Coupon />} />
                    <Route path="/admin/app/toss" element={<Toss />} />

                    Management
                    <Route
                        path="/admin/products/new"
                        element={<NewProduct />}
                    />
                    <Route
                        path="/admin/products/:id"
                        element={<ProductManagement />}
                    />
                    <Route
                        path="/admin/transaction/:id"
                        element={<TransactionManagement />}
                    />
                </Route> */}
            </Routes>
        </Router>
    );
}

export default App;
