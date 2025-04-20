import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
    const role = localStorage.getItem("role");  // Get the role from storage

    return role === "USER" ? <Outlet /> : <Navigate to="/Login" />;
};

export default UserPrivateRoute;