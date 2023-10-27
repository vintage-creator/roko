import React from "react";

export const Stepper = ({ activeS }) => {
  const steps = ["Corporate", "Individual", "Student"];

  return (
    <div className="mt-8 flex gap-2 w-[100%] justify-between">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`w-20 h-[8px] rounded-[8px] ${
            index === activeS ? "bg-base" : "bg-gray"
          }`}
        ></div>
      ))}
    </div>
  );
};

