import React, { useEffect } from "react";
import { showToast } from "../../Toastify/Toast";
import { useNavigate } from "react-router-dom";
import { EmailVerifyApi } from "../../utils/ApiCalls";

const Verification = () => {
  const nav = useNavigate();
  const VerifyEmail = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      const res = await EmailVerifyApi(token);

      if (res) {
        showToast({
          type: "success",
          message: "Email Verified! You can log in now",
        });
      } else {
        showToast({
          type: "error",
          message: "Email verification failed. Please try again.",
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        message: "An error occurred during email verification.",
      });
    }
  };

  useEffect(() => {
    VerifyEmail();
  }, []);

  return null;
};

export default Verification;
