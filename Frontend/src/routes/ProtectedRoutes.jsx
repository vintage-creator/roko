import React from "react";
import { Navigate } from "react-router-dom";
import { showToast } from "../Toastify/Toast";
import { isAuthenticated } from "../Auth";

const ProtectedRoutes = ({ element }) => {
  let auth = { token: isAuthenticated() };

  if (!auth.token) {
    showToast({
      type: "error",
      message: "Please, Login to Continue",
    });
    return <Navigate to="/" replace />;
  }

  return auth.token && element;
};

export default ProtectedRoutes;
