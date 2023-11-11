import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import Notfound from "../pages/Notfound";
import Dashboard from "../pages/Dashboard";
import AboutUs from "../pages/AboutUs";
import Courses from "../pages/Courses";
import { SingleCourse } from "../pages/Courses/ExploreCourses/SingleCourse";
import Verification from "../pages/EmailVerify/Verification";
import { useMyContext } from "../context";
import { EmailVerified } from "../pages/EmailVerify/EmailVerified";

export const NavRoutes = () => {
  const { isAuthenticated } = useMyContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<SingleCourse />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/auth/verify" element={<Verification />} />
        <Route
          path="/email-verification"
          element={
            <ProtectedRoutes
              element={<EmailVerified />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes
              element={<Dashboard />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};
