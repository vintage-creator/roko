import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import { IndividualStep5 } from "./IndividualStep5";
import steps from "../../utils/data/steps.json";
import { CreateAccountApi } from "../../utils/ApiCalls";

export const IndividualStep4 = ({ setPayload, payload }) => {
  const {
    activeStep,
    setActiveStep,
    StepThree,
    setStepThree,
    StepFour,
    setStepFour,
    StepFive,
    setStepFive,
  } = useMyContext();

  const [passwordError, setPasswordError] = useState(false);
  const isStrongPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isPasswordMatching = (password, confirmedPassword) => {
    return password === confirmedPassword;
  };

  const [formData, setFormData] = useState({
    ...payload,
    password: "",
    confirm_password: "",
  });

  console.log("payload", formData);

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password" || name === "confirm_password") {
      setPasswordError(false);
    }
  };

  const isEmpty = formData.password === "" || formData.confirm_password === "";

  const handlePayment = async () => {
    // if (!isStrongPassword(formData.password)) {
    //   setPasswordError(
    //     "Password should be at least 8 characters long, contain 1 uppercase, 1 lowercase, and 1 special character."
    //   );
    // } else

    try {
      if (!isPasswordMatching(formData.password, formData.confirm_password)) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError(false);
        const response = await CreateAccountApi(payload);
        console.log("SignUpresponse", response);
      }
    } catch (error) {
      console.error("Error creating an account", error);
    } finally {
      // setIsLoading(false);
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
              Choose a Secure Password
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
                htmlFor="password"
                className="text-fourteenPixels font-semibold"
              >
                Choose password
              </label>
              <Input
                className="w-full py-3 px-[8px] rounded-[7px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                placeholder="************"
                name="password"
                id="password"
                value={formData.password}
                onChange={handlePayload}
                type="password"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
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
                value={formData.confirm_password}
                onChange={handlePayload}
                type="password"
              />
              {passwordError && (
                <p className="text-[14px] text-red-500">{passwordError}</p>
              )}
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
                onClick={handlePayment}
                bg={`${isEmpty ? "bg-disabled" : "bg-base"}`}
                className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                disabled={isEmpty && true}
              >
                Proceed to Payment
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
    </>
  );
};
