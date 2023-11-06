import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

export const EmailVerified = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <div>
        <MdVerified color="#008080" size={80} />
      </div>
      <h1 className="lg:text-2xl font-bold">Your Email has been Verified!</h1>
      <Link to="/login">
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          // w="w-full"
          bg="bg-base"
          type="submit"
        >
          Sign in
        </Button>
      </Link>
    </div>
  );
};
