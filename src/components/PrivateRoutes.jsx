import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={props.to || "/login"} />
    );
};
export default ProtectedRoutes;
