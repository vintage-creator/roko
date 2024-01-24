import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IndividualStep4 } from "./Individual/IndividualStep4";
import { useMyContext } from "../context";
import steps from "../utils/data/steps.json";
import { Button } from "./Button/Button";

export const PaymentSuccess = ({ setPayload, payload }) => {
  const { activeStep, setActiveStep, setStepFour, StepFour } = useMyContext();

  const handleReg = () => {};

  setStepFour(true);
  if (activeStep < steps.length - 1) {
    setActiveStep(activeStep + 1);
  }

  return (
    <>
      {!StepFour && (
        <div className="flex flex-col justify-center items-center gap-4 h-screen">
          <div>
            <IoCheckmarkCircle color="#008080" size={80} />
          </div>
          <h1 className="lg:text-2xl font-bold text-base">
            Payment Successful
          </h1>
          <h2 className="text-sm lg:text-xl font-semibold ">
            Click the link below to continue with your Registration
          </h2>
          <Button
            text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
            w="w-[50%]"
            onClick={handleReg}
          >
            Continue
          </Button>
        </div>
      )}

      {StepFour && (
        <IndividualStep4 setPayload={setPayload} payload={payload} />
      )}
    </>
  );
};
