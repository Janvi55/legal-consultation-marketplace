import { Navigate, Outlet } from "react-router-dom";

const LawyerPrivateRoute = () => {
    const role = localStorage.getItem("role");  // Get the role from storage

    return role === "lawyer" ? <Outlet /> : <Navigate to="/lawyerLogin" />;
};

export default LawyerPrivateRoute;