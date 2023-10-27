import React from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";

export const CorporateStep4 = () => {
  const { activeStep, setActiveStep, StepThree, setStepThree, setStepFour } =
    useMyContext();

  const handleNext = () => {};

  const handlePrevious = () => {
    setStepFour(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="flex">
      {/* LEFT */}
      <div className="lg:w-[50%] bg-base hidden lg:flex lg:flex-col lg:justify-between px-[60px] pt-8 ">
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
      <div className="lg:w-[50%] px-8 sm:px-10 lg:px-20 py-10  flex flex-col justify-between items-center">
        <div>
          <h2 className="text-twentyPixels md:text-thirtyPixels lg:text-thirtyPixels font-bold">
            Select a Plan
          </h2>

          <ProgressBar activeStep={activeStep} setActiveStep={setActiveStep} />

          <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
            Enjoy amazing insurance services by creating your first account.
            this is only going to take 5 minutes
          </p>

          <div className="border border-gray mt-8 rounded-[8px] px-4 py-6">
            <h4 className="text-[16px] md:text-[20px] lg:text-[24px] text-base font-semibold">
              $220,000/
              <span className="text-[14px] md:text-[16px] lg:text-[18px] text-[#00000080] font-bold">
                Annum
              </span>
            </h4>

            <p className="text-[#00000080] mt-4">
              Stay protected, gain power, knowledge and practical skills from
              our education materials and risk management tools.
            </p>

            <ul className="mt-4">
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Up to 50,000,000 NGN coverage.{" "}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                {" "}
                - Cover for Up to 50 beds.{" "}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Cover for 13 staff.{" "}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Access to educational and risk management materials.{" "}
              </li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <label
              htmlFor="summary"
              className="text-fourteenPixels font-semibold"
            >
              Plan duration
            </label>
            <select className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none">
              <option value="Choose duration">Choose duration</option>

              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
            </select>
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-between gap-4">
            <Button
              text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
              w="w-full"
              onClick={handlePrevious}
            >
              Previous
            </Button>
            <Button
              text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
              w="w-full"
              onClick={handleNext}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
