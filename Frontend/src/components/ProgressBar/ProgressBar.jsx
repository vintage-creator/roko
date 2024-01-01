import React from "react";
import steps from "../../utils/data/steps.json";

export const ProgressBar = ({ activeStep }) => {
  const getStepColor = (index) => {
    if (index === activeStep) {
      return steps[index].activeColor;
    } else {
      return steps[index].color;
    }
  };

  return (
    <div className="mt-8 flex gap-6 w-[100%] ">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-20 h-[8px] rounded-[8px] ${getStepColor(index)}`}
        ></div>
      ))}
    </div>
  );
};
