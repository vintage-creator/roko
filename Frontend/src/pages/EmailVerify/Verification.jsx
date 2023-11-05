import React, { useEffect, useState } from "react";

const Verification = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  const VerifyEmail = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      const res = await EmailVerifyApi(token);
      console.log("emailRes", res);
      if (res.success) {
        setVerificationStatus("Verification Successful!");
      } else {
        setVerificationStatus("Verification Failed");
      }
    } catch (error) {}
  };

  useEffect(() => {
    VerifyEmail();
  }, []);

  return (
    <div>
      <h1>Verification Status</h1>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default Verification;
