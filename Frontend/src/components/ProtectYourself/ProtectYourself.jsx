import React from "react";
import nurse from "../../assets/nurse2.png";
import { Link } from "react-router-dom";
import Button from "../Button";

export const ProtectYourself = () => {
  return (
    <div className="bg-black px-4 md:px-10 py-7 lg:pb-0 md:pt-10 text-secOrange flex flex-col-reverse md:flex-row ">
      <div className=" md:w-[100%] flex flex-col justify-center items-center ">
        <p className="text-[12px] md:text-[14px] lg:text-[18px] uppercase text-center">
          Protect yourself from unplanned Legal fees
        </p>
        <p className="text-[25px] md:text-[30px] lg:text-[40px] text-[#fff] font-semibold text-center">
          Learn while being protected!
        </p>
        <div className="mt-4">
          <Link to="/register">
            <Button
              className="font-bold hover:bg-[#fff] hover:text-secondary transition duration-500"
              text="text-[10px] md:text-[16px] text-[#fff]"
              rounded="rounded-[6px]"
              bg="bg-secondary"
              w="w-[100px] md:w-[150px]"
              h="h-[30px] md:h-[42px]"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div
        className="hidden lg:flex h-[200px] md:w-[40%] md:h-[300px] rounded-[30px] md:mr-40"
        style={{
          backgroundImage: `url(${nurse})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};
