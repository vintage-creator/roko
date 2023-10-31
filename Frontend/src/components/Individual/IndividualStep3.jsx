import React, { useEffect, useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import steps from "../../utils/data/steps.json";
import { CorporateStep4 } from "../Cooporate/CorporateStep4";

export const IndividualStep3 = ({ setPayload, payload }) => {
  const {
    activeStep,
    setActiveStep,
    StepThree,
    setStepThree,
    setStepTwo,
    setStepFour,
    StepFour,
  } = useMyContext();

  const initialFormData = payload || {
    fieldOfPractice: "",
    yearsOfExperience: "",
    hasPreviousLegalAction: "",
    summaryOfLegalAction: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  console.log("payload", formData);

  useEffect(() => {
    setFormData({ ...payload });
  }, [payload]);

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmpty =
    formData.fieldOfPractice === "" ||
    formData.yearsOfExperience === "" ||
    formData.hasPreviousLegalAction === "" ||
    formData.summaryOfLegalAction === "";

  const handleCheckboxChange = (e) => {
    const { checked, name } = e.target;
    const value = checked ? name : "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      hasPreviousLegalAction: value,
    }));
  };

  const handleNext = () => {
    setPayload({ ...formData });
    setStepFour(true);
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    setStepThree(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <>
      {!StepFour && (
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
                More About Your Field
              </h2>

              <ProgressBar
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />

              <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
                Enjoy amazing insurance services by creating your first account.
                this is only going to take 5 minutes
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="fieldOfPractice"
                  className="text-fourteenPixels font-semibold"
                >
                  Field of Practice
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your field of practice"
                  name="fieldOfPractice"
                  id="fieldOfPractice"
                  value={formData.fieldOfPractice}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="yearsOfExperience"
                  className="text-fourteenPixels font-semibold"
                >
                  Years of Experience
                </label>
                <Input
                  type="number"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your years of experience"
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="legal_action"
                  className="text-fourteenPixels font-semibold"
                >
                  Any previous legal action?
                </label>
                <div className="flex w-[50%] gap-4">
                  <div className="border border-gray flex items-center rounded-[8px] pl-2 py-3 pr-6">
                    <input
                      type="checkbox"
                      name="yes"
                      checked={formData.hasPreviousLegalAction === "yes"}
                      onChange={handleCheckboxChange}
                      className="w-10 px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="border border-gray flex items-center pr-2 rounded-[8px] pl-2 py-3 pr-6">
                    <input
                      type="checkbox"
                      name="no"
                      checked={formData.hasPreviousLegalAction === "no"}
                      onChange={handleCheckboxChange}
                      className="w-10 px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="summaryOfLegalAction"
                  className="text-fourteenPixels font-semibold"
                >
                  If Yes, please summarize here
                </label>
                <textarea
                  name="summaryOfLegalAction"
                  id="summaryOfLegalAction"
                  value={formData.summaryOfLegalAction}
                  onChange={handlePayload}
                  cols="10"
                  rows="5"
                  className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                ></textarea>
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
                  bg={isEmpty ? "bg-disabled" : "bg-base"}
                  className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                  disabled={isEmpty}
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

      {StepFour && <CorporateStep4 />}
    </>
  );
};
