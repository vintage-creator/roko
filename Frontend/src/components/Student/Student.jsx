import React from "react";
import nurse from "../../assets/nurse.png";

export const Student = () => {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="lg:w-[50%] bg-base h-screen hidden lg:flex lg:flex-col lg:justify-between px-[60px] pt-8 ">
        <div className="">
          <div className="w-[150px] h-[30px] bg-shades mb-12"></div>
          <h1 className="md:text-thirtyPixels lg:text-[45px] font-bold leading-[50px] text-white">
            Insurance works for you when you blah and protect
          </h1>
        </div>
        <div className="md:flex md:justify-between md:items-center">
          <img
            src={nurse}
            alt="An image of a Nurse"
            width={"45%"}
            className="h-[310px]"
          />
          <p className="mt-40 text-white text-eighteenPixels font-semibold cursor-pointer">
            Help?
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="lg:w-[50%] h-screen px-8 sm:px-10 lg:px-20 py-10  flex flex-col justify-between items-center">
        <p>STUDENT SIGN UP</p>
      </div>
    </div>
  );
};
