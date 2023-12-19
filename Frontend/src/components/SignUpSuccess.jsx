import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

export const SignUpSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <div>
        <IoCheckmarkCircle color="#008080" size={80} />
      </div>
      <h1 className="lg:text-2xl font-bold text-base">Registration Successful</h1>
      <h2 className="text-sm lg:text-xl font-semibold ">
        Check your Mail Box to verify your account
      </h2>
    </div>
  );
};
