import React, { useState } from "react";

export const ProgressBar = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { color: "bg-base" },
    { color: "bg-gray" },
    { color: "bg-gray" },
    { color: "bg-gray" },
    { color: "bg-gray" },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="mt-8 flex gap-2 w-[100%] justify-between">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-20 h-[8px] rounded-[8px] ${step.color}`}
          onClick={() => setActiveStep(index)}
        ></div>
      ))}
    </div>
  );
};
