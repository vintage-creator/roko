import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import { CorporateStep3 } from "./CorporateStep3";
import steps from "../../utils/data/steps.json";

export const CorporateStep2 = () => {
  const { activeStep, setActiveStep, StepThree, setStepThree, setStepTwo } =
    useMyContext();

  // const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    bed_number: "",
    staff_number: "",
    yes: "",
    no: "",
    summary: "",
  });

  const isEmpty =
    payload.bed_number === "" ||
    payload.staff_number === "" ||
    (payload.yes === "" && payload.no === "") ||
    payload.summary === "";

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleCheckboxChange = (checkboxName, e) => {
    const { checked } = e.target;

    setTimeout(() => {
      if (checked) {
        setPayload((prevPayload) => ({
          ...prevPayload,
          [checkboxName]: checkboxName === "yes" ? "yes" : "no",
        }));
        if (checkboxName === "yes") {
          setPayload((prevPayload) => ({ ...prevPayload, no: "" }));
        } else {
          setPayload((prevPayload) => ({ ...prevPayload, yes: "" }));
        }
      } else {
        setPayload((prevPayload) => ({ ...prevPayload, [checkboxName]: "" }));
      }
    }, 0);
  };

  const handleNext = () => {
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
                More About Your Company
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
                  htmlFor="bed_number"
                  className="text-fourteenPixels font-semibold"
                >
                  Number of Bed Spaces
                </label>
                <Input
                  type="number"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Type or select number  of bed spaces"
                  name="bed_number"
                  id="bed_number"
                  value={payload.bed_number}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="staff_number"
                  className="text-fourteenPixels font-semibold"
                >
                  Number of Staff
                </label>
                <Input
                  type="number"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Type or select number of staff"
                  name="staff_number"
                  id="staff_number"
                  value={payload.staff_number}
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
                      id="yes"
                      checked={payload.yes === "yes"}
                      onChange={(e) => handleCheckboxChange("yes", e)}
                      className="w-10  px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="border border-gray flex items-center pr-2 rounded-[8px] pl-2 py-3 pr-6">
                    <input
                      type="checkbox"
                      name="no"
                      id="no"
                      checked={payload.no === "no"}
                      onChange={(e) => handleCheckboxChange("no", e)}
                      className="w-10  px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="summary"
                  className="text-fourteenPixels font-semibold"
                >
                  If Yes, please summarize here
                </label>
                <textarea
                  name="summary"
                  id="summary"
                  value={payload.summary}
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

      {StepThree && <CorporateStep3 />}
    </>
  );
};
