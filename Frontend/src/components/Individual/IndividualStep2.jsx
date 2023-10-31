import React, { useEffect, useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import steps from "../../utils/data/steps.json";
import { IndividualStep3 } from "./IndividualStep3";

export const IndividualStep2 = ({ setPayload, payload }) => {
  const {
    activeStep,
    setActiveStep,
    StepThree,
    setStepThree,
    StepFour,
    setStepFour,
    setStepTwo,
  } = useMyContext();

  const [formData, setFormData] = useState({
    ...payload,
    idType: "",
    idNumber: "",
  });
  console.log("payload", formData);

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIdTypeChange = (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      idType: value,
    }));
  };

  const isEmpty = formData.idType === "" || formData.idNumber === "";

  const handleNext = () => {
    // setPayload({ ...formData });
    setStepThree(true);
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    setStepTwo(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <>
      {!StepThree && (
        <div className="flex ">
          {/* LEFT */}
          <div className="lg:w-[50%] bg-base hidden lg:flex lg:flex-col lg:justify-between px-[60px] pt-8 h-screen">
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
                  htmlFor="idType"
                  className="text-fourteenPixels font-semibold"
                >
                  ID Type
                </label>
                <select
                  className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  name="idType"
                  id="idType"
                  value={formData.idType}
                  onChange={handleIdTypeChange}
                >
                  <option value="">Choose ID Type</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="Permanent Voter's Card">
                    Permanent Voter's Card
                  </option>
                  <option value="National Identification Number (NIN)">
                    National Identification Number (NIN)
                  </option>
                  <option value="International Passport">
                    International Passport
                  </option>
                </select>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="idNumber"
                  className="text-fourteenPixels font-semibold"
                >
                  ID Number
                </label>
                <Input
                  className="w-full py-3 px-[8px] rounded-[7px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your ID number"
                  name="idNumber"
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={handlePayload}
                  type="text"
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

      {StepThree && (
        <IndividualStep3 setFormData={setFormData} formData={formData} />
      )}
    </>
  );
};
