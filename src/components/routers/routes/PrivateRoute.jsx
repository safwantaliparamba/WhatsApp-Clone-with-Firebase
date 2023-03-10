import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const is_verified = useSelector(state => state.auth.isAuthenticated)

    const location = useLocation();

    return is_verified ? (
        children
    ) : (
        <Navigate
            to="/auth/login"
            // to={
            //     location.pathname
            //         ? `auth/login?next=${location.pathname}`
            //         : "auth/login"
            // }
        />
    );
};

export default PrivateRoute;
