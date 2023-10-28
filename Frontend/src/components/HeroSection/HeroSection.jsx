import React from "react";
import med from "../../assets/med1.png";
import Button from "../Button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="w-full flex justify-between mt-4 lg:mt-6 lg:gap-10">
      <div className="lg:w-[50%] h-[200px] lg:h-[400px] lg:pt-10 flex flex-col gap-4">
        <h1 className="text-[24px] md:text-[40px] md:w-[80%] lg:w-[100%] lg:text-[50px] leading-[24px] md:leading-[40px] lg:leading-[60px] text-[#fff] font-bold ">
          Nigeria’s top medical protection organization.
        </h1>
        <p className="text-[10px] md:text-[16px] lg:text-[18px] lg:mt-4 text-[#fff] font-regular  md:w-[70%] lg:w-[100%] 2xl:w-[90%]">
          We provide much more than just protection as we believe that
          prevention is preferable to treatment; instead, we educate you about
          risks and offer professional guidance and support.
        </p>
        <div className="flex gap-4 lg:gap-10">
          <Link to="/register">
            <Button
              className="lg:mt-4 font-bold hover:bg-[#fff] hover:text-secondary transition duration-500"
              text="text-[10px] lg:text-[16px] text-[#fff]"
              rounded="rounded-[6px]"
              bg="bg-secondary"
              w="w-[100px] lg:w-[123px]"
              h="h-[30px] lg:h-[42px]"
            >
              Join ROKO
            </Button>
          </Link>

          <Link to="/register"></Link>
          <Button
            className="lg:mt-4 font-bold hover:bg-[#fff] hover:text-secondary transition duration-500"
            text="text-[10px] lg:text-[16px] text-[#fff]"
            rounded="rounded-[6px]"
            bg="bg-secondary"
            w="w-[100px] lg:w-[123px]"
            h="h-[30px] lg:h-[42px]"
          >
            Learn more
          </Button>
        </div>
      </div>
      <div
        className="w-[50%] h-[400px] rounded-[30px] hidden lg:flex"
        style={{
          backgroundImage: `url(${med})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};
