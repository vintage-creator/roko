import React, { useEffect, useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import steps from "../../utils/data/steps.json";
import { IndividualStep5 } from "./IndividualStep5";

export const IndividualStep4 = ({ setPayload, payload }) => {
  const {
    activeStep,
    setActiveStep,
    setStepFour,
    StepFive,
    setStepFive,
  } = useMyContext();

  const [formData, setFormData] = useState({
    ...payload,
    employmentStatus: "",
    employerName: "",
    employerAddress: "",
    employerPhone: "",
  });

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmpty =
    formData.employmentStatus === "" ||
    formData.employerName === "" ||
    formData.employerAddress === "" ||
    formData.employerPhone === "";

  const handleNext = () => {
    setStepFive(true);
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    setStepFour(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <>
      {!StepFive && (
        <div className="flex ">
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
                Tell Us More About You
              </h2>

              <ProgressBar
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />

              <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
                Enjoy amazing insurance services by creating your first account.
                This is only going to take 5 minutes
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="employmentStatus"
                  className="text-fourteenPixels font-semibold"
                >
                  Employment Status
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter status"
                  name="employmentStatus"
                  id="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="employerName"
                  className="text-fourteenPixels font-semibold"
                >
                  Name of Employer
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter name"
                  name="employerName"
                  id="employerName"
                  value={formData.employerName}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="employerAddress"
                  className="text-fourteenPixels font-semibold"
                >
                  Employer's Address
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter address"
                  name="employerAddress"
                  id="employerAddress"
                  value={formData.employerAddress}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="employerPhone"
                  className="text-fourteenPixels font-semibold"
                >
                  Employer's Telephone
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter telephone"
                  name="employerPhone"
                  id="employerPhone"
                  value={formData.employerPhone}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
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
                  bg={`${isEmpty ? "bg-disabled" : "bg-base"}`}
                  className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                  disabled={isEmpty && true}
                >
                  Next
                </Button>
              </div>
              <Link to="/login">
                <p className="text-twelvePixels md:text-thirteenPixels lg:text-fourteenPixels font-semibold text-center cursor-pointer mt-4">
                  Already have an account?{" "}
                  <span className="text-secondary">Sign in</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {StepFive && (
        <IndividualStep5 setFormData={setFormData} formData={formData} />
      )}
    </>
  );
};
