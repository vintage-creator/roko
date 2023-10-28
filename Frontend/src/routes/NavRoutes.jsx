import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import Notfound from "../pages/Notfound";
import Dashboard from "../pages/Dashboard";

export const NavRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        {/* <Route path="/individualSignup" element={<Individual />} /> */}
        {/* <Route path="/organizationSignup" element={<Organisation />} /> */}

        <Route element={<ProtectedRoutes />} isAuthenticated={isAuthenticated}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};
