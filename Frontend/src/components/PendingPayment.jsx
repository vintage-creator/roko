import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { Button } from "./Button/Button";
import { Link } from "react-router-dom";

export const PendingPayment = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <div>
        <MdOutlinePending color="#008080" size={80} />
      </div>
      <h1 className="lg:text-2xl font-bold text-base">
        Your Payment is Pending
      </h1>
      <h2 className="text-sm lg:text-xl font-semibold ">Please wait...</h2>
      <Link to="/">
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          w="w-[100%]"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};
