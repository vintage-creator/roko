import React from "react";
import { Navigate } from "react-router-dom";
import { showToast } from "../Toastify/Toast";

const ProtectedRoutes = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    showToast({
      type: "error",
      message: "Please, Login to Continue",
    });
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoutes;
