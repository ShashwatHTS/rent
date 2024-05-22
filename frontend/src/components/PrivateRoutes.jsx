import React from "react";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = (props) => {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    const isAuthenticated = false
    return !isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={props.to || "/signin"} />
    );
};
export default ProtectedRoutes;
