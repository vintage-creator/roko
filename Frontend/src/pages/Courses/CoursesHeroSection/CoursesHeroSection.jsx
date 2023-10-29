import React from "react";
import med from "../../../assets/med1.png";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";
import doctor from "../../../assets/doctor.png";
import Button from "../../../components/Button";

export const CoursesHeroSection = () => {
  return (
    <div className="w-full flex justify-between mt-4 lg:mt-6">
      <div className="lg:w-[50%] h-[200px] md:h-[300px] lg:h-[480px]  flex flex-col gap-4 justify-center">
        <h1 className="text-[24px] md:text-[40px] md:w-[80%] lg:w-[100%] lg:text-[50px] leading-[24px] md:leading-[40px] lg:leading-[50px] text-[#fff] font-bold ">
          Insurance works for you when you blah and protect
        </h1>
        <p className="text-[10px] md:text-[16px] lg:text-[18px] lg:mt-4 text-[#fff] font-regular  md:w-[70%] lg:w-[100%] 2xl:w-[90%]">
          We provide much more than just protection as we believe that
          prevention is preferable to treatment; instead, we educate you about
          risks and offer professional guidance and support.
        </p>
        <div className="bg-[#fff] w-[80%] md:mt-4 flex h-8  md:h-12 rounded-[6px]">
          <input type="text" className="w-full rounded-l-[12px]" />
          <button className="hidden md:block w-[200px] p-2 bg-secOrange m-1 rounded-[6px] text-[#fff] font-semibold">
            Search Courses{" "}
          </button>
          <button className="block md:hidden md:w-[200px] px-6 bg-secOrange m-1 rounded-[6px] font-semibold text-[#fff] text-[12px]  md:text-[16px]">
            Search
          </button>
        </div>
      </div>
      <div className="w-[50%] h-[500px] rounded-[30px] hidden lg:flex justify-end">
        <div
          className="w-[100%]"
          style={{
            backgroundImage: `url(${doctor})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};
