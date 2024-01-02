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
  const { activeStep, setActiveStep, StepTwo, setStepTwo, setIndiviualSignUp } =
    useMyContext();

  const [emailError, setEmailError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isOver18 = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age = age - 1;
    }

    return age >= 18;
  };

  const [payload, setPayload] = useState({
    ...formData,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    resAddress: "",
    state: "",
    nextofkin: "",
    password: "",
    confirm_password: "",
  });

  console.log("payload", payload)

  const isEmpty =
    payload.lastName === "" ||
    payload.firstName === "" ||
    payload.phone === "" ||
    payload.state === "" ||
    payload.email === "" ||
    payload.resAddress === "" ||
    payload.confirm_password === "" ||
    payload.password === "" ||
    payload.nextofkin === "" ||
    payload.dateOfBirth === "";

  const [passwordError, setPasswordError] = useState(false);

  const isStrongPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const isPasswordMatching = (password, confirmedPassword) => {
    return password === confirmedPassword;
  };

  const handleNext = () => {
    if (!isEmailValid(payload.email)) {
      setEmailError(true);
      return;
    }

    if (!isOver18(payload.dateOfBirth)) {
      setAgeError(true);
      return;
    }

    if (!isPasswordMatching(payload.password, payload.confirm_password)) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(payload.password)) {
      setPasswordError(
        "Password should be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 special character."
      );
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

              <div className="flex flex-col lg:flex-row items-center justify-between md:gap-4">
                <div className="mt-4 flex flex-col gap-2  w-full">
                  <label
                    htmlFor="firstName"
                    className="text-fourteenPixels font-semibold"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    placeholder="Enter your first name"
                    name="firstName"
                    id="firstName"
                    value={payload.firstName}
                    onChange={handlePayload}
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2  w-full">
                  <label
                    htmlFor="lastName"
                    className="text-fourteenPixels font-semibold"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    placeholder="Enter your last name"
                    name="lastName"
                    id="lastName"
                    value={payload.lastName}
                    onChange={handlePayload}
                  />
                </div>
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
                />
                {emailError ? (
                  <p className="text-[14px] text-red-500">
                    Please enter a valid email address.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between md:gap-4">
                <div className="mt-4 flex flex-col gap-2 w-full">
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
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2 w-full">
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
                  />
                </div>
              </div>
              {ageError && (
                <p className="text-[14px] text-red-500">
                  You must be at least 18 years old to sign up.
                </p>
              )}

              <div className="flex flex-col lg:flex-row items-center justify-between md:gap-4">
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <label
                    htmlFor="resAddress"
                    className="text-fourteenPixels font-semibold"
                  >
                    Residential Address
                  </label>
                  <Input
                    type="text"
                    className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    placeholder="Enter your address"
                    name="resAddress"
                    id="resAddress"
                    value={payload.resAddress}
                    onChange={handlePayload}
                  />
                </div>
                <div className="mt-4 flex flex-col gap-2 w-full">
                  <label
                    htmlFor="state"
                    className="text-fourteenPixels font-semibold"
                  >
                    State of Origin
                  </label>
                  <Input
                    type="text"
                    className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                    placeholder="Enter your state"
                    name="state"
                    id="state"
                    value={payload.state}
                    onChange={handlePayload}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className="text-fourteenPixels font-semibold"
              >
                Next of Kin
              </label>
              <Input
                type="text"
                className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                placeholder="Enter full name of next of kin"
                name="nextofkin"
                id="nextofkin"
                value={payload.nextofkin}
                onChange={handlePayload}
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between md:gap-4 w-full">
              <div className="mt-4 flex flex-col gap-2 w-full">
                <label
                  htmlFor="password"
                  className="text-fourteenPixels font-semibold"
                >
                  Choose a secure password
                </label>
                <Input
                  className="w-full py-3 px-[8px] rounded-[7px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="************"
                  name="password"
                  id="password"
                  value={payload.password}
                  onChange={handlePayload}
                  type="password"
                />
              </div>
              <div className="mt-4 flex flex-col gap-2 w-full">
                <label
                  htmlFor="confirm_password"
                  className="text-fourteenPixels font-semibold"
                >
                  Confirm password
                </label>
                <Input
                  className="w-full py-3 px-[8px] rounded-[7px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="************"
                  name="confirm_password"
                  id="confirm_password"
                  value={payload.confirm_password}
                  onChange={handlePayload}
                  type="password"
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-[14px] text-red-500 mt-4">{passwordError}</p>
            )}

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
