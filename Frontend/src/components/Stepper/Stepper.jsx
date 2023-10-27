import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";

export const Stepper = ({ activeStep }) => {
  const steps = ["Corporate", "Individual", "Student"];

  return (
    <div className="mt-8 flex gap-2 w-[100%] justify-between">
      {steps.map((item, index) => (
        <div
          key={IoIosHeartEmpty}
          className={`w-20 h-[8px] rounded-[8px] ${
            index === activeStep ? "bg-base" : "bg-gray"
          }`}
        ></div>
      ))}
    </div>
  );
};

