import React from "react";
import med2 from "../../assets/med2.png";
import med3 from "../../assets/med3.png";
import med4 from "../../assets/med4.png";
import { Link } from "react-router-dom";
import Button from "../Button";
import { IoMdCheckmark } from "react-icons/io";

export const WhyRoko = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-10 gap-4 mt-4 lg:mt-10 max-w-[1500px] m-auto">
      <div className="lg:w-[50%]">
        <div
          className="h-[200px] lg:h-[300px] rounded-[30px]"
          style={{
            backgroundImage: `url(${med4})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="hidden lg:flex flex-col md:flex-row gap-2 md:gap-0">
          <div
            className="h-[200px] rounded-[30px] md:w-[50%]"
            style={{
              backgroundImage: `url(${med2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="h-[200px] rounded-[30px] md:w-[50%] "
            style={{
              backgroundImage: `url(${med3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      <div className="lg:w-[50%]  py-2 pb-8 lg:py-8 lg:pl-10">
        <p className="text-secOrange font-semibold">Why ROKO?</p>

        <h4 className="text-[25px] lg:text-[40px] leading-[25px] lg:leading-[40px] lg:pr-20 font-bold mt-3">
          Why we are more than regular insurance
        </h4>

        <p className="w-[90%] mt-4 text-[12px] lg:text-[16px]">
          With our online learning, risk management tools, and free
          instructional materials, Get the best defense, knowledge and skills in
          your practice.
        </p>

        <ul className="mt-4 text-[12px] lg:text-[16px]">
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            Continous professional development
          </li>
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            Defense for firms, medical practitioners and students.
          </li>
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            Comprehensive network of medicolegal experts.
          </li>
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            Up to 70million NGN coverage.
          </li>
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            24/7 access to customer support .
          </li>
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            Guidance by experts when faced with pressure in your work.
          </li>
          <li className="flex gap-2 items-center">
            <IoMdCheckmark color="#d1833a" />
            Strong team on hand to handle your claims.
          </li>
        </ul>

        <div className="mt-4">
          <Link to="/register">
            <Button
              className="lg:mt-5 font-bold hover:bg-base hover:text-[#fff] transition duration-500"
              text="text-[10px] lg:text-[16px] text-[#fff]"
              rounded="rounded-[6px]"
              bg="bg-secondary"
              w="w-[100px] lg:w-[150px]"
              h="h-[30px] lg:h-[42px]"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
