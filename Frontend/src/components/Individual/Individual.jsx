import React, { useEffect, useState } from "react";
import nurse from "../../assets/nurse.png";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import Input from "../Input";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import steps from "../../utils/data/steps.json";
import { useMyContext } from "../../context";
import { IndividualStep2 } from "./IndividualStep2";

export const Individual = ({ setFormData, formData }) => {
  const {
    activeStep,
    setActiveStep,
    StepTwo,
    setStepTwo,
    IndiviualSignUp,
    setIndiviualSignUp,
  } = useMyContext();

  const [emailError, setEmailError] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [payload, setPayload] = useState({
    ...formData,
    fullname: "",
    phone: "",
    email: "",
    dateOfBirth: "",
  });
  console.log("payload", payload);

  const isEmpty =
    payload.fullname === "" ||
    payload.phone === "" ||
    payload.email === "" ||
    payload.dateOfBirth === "";

  const handleNext = () => {
    if (!isEmailValid(payload.email)) {
      setEmailError(true);
      // You might want to display a message to the user or prevent moving to the next step
      return;
    }

    setStepTwo(true);
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    setIndiviualSignUp(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(!isEmailValid(value));
    }
  };

  return (
    <>
      {!StepTwo && (
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
                  htmlFor="name"
                  className="text-fourteenPixels font-semibold"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your full name"
                  name="fullname"
                  id="fullname"
                  value={payload.fullname}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-fourteenPixels font-semibold"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your email address"
                  name="email"
                  id="email"
                  value={payload.email}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
                {emailError ? (
                  <p className="text-[14px] text-red-500">
                    Please enter a valid email address.
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-fourteenPixels font-semibold"
                >
                  Phone Number
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your phone number"
                  name="phone"
                  id="phone"
                  value={payload.phone}
                  onChange={handlePayload}
                  // rightIcon={<MdEmail color="#008080" />}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="dateOfBirth"
                  className="text-fourteenPixels font-semibold"
                >
                  Date of Birth
                </label>
                <Input
                  type="date"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="Enter your date of birth"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={payload.dateOfBirth}
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

      {StepTwo && <IndividualStep2 payload={payload} setPayload={setPayload} />}
    </>
  );
};
