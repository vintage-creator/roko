import React from "react";
import { Link } from "react-router-dom";
import {CgCloseO} from "react-icons/cg"
import Button from "../../components/Button";

export const Notfound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <div>
        <CgCloseO color="red" size={80} />
      </div>
      <h1 className="lg:text-2xl font-bold">Page Not Found!</h1>
      <Link to="/">
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          // w="w-full"
          bg="bg-base"
          type="submit"
        >
          Home
        </Button>
      </Link>
    </div>
  );
};
