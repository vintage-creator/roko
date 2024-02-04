import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import ReactDOM from "react-dom";
import { IndividualStep4 } from "../components/Individual/IndividualStep4";

export const NavRoutes = () => {
  const { isAuthenticated } = useMyContext();

  useEffect(() => {
    // Check the URL parameters for payment success
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("status");

    // Check if payment is successful and render IndividualStep4
    if (paymentStatus === "successful") {
      // Render the IndividualStep4 component directly
      ReactDOM.render(<IndividualStep4 />, document.getElementById("root"));
    }
  }, []);

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
        <Route path="/email-verification" element={<EmailVerified />} />

        <Route
          path="/wh/confirm-payment"
          element={<IndividualStep4 />}
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
