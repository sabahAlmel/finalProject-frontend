import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <Navigate to="/auth" />;
  } else {
    if (role === "any" && !currentUser) {
      return <Navigate to="/auth" />;
    }

    if (role === "admin" && currentUser.role !== "admin") {
      return <Navigate to="/403" />;
    }
    if (
      (currentUser && role === "any") ||
      (currentUser.role === "admin" && role === "admin")
    )
      return children ? children : <Outlet />;
  }
}

export default ProtectedRoute;
