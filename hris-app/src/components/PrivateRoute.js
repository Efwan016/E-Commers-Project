import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    const isValidAuth =
        auth &&
        auth.isLoggedIn === true &&
        typeof auth.token === "string" &&
        auth.token.trim() !== "";

    if (!isValidAuth) {
        localStorage.removeItem("auth");
        return <Navigate to="/login" replace />;
    }

    if (roles && roles.length > 0 && !roles.includes(auth.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;