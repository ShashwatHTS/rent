import React from "react";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../atoms";
const ProtectedRoutes = (props) => {
    const [authState, setAuthState] = useAuthState();
    const isAuthenticated = false
    return authState.loggedIn ? (
        <Outlet />
    ) : (
        <Navigate to={props.to || "/signin"} />
    );
};
export default ProtectedRoutes;
