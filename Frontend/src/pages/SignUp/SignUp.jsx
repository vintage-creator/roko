import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { RegButton } from "../../components/Button/RegButton";
import Coorporate from "../../components/Cooporate";
import "./SignUp.css";
import { Student } from "../../components/Student/Student";
import { Individual } from "../../components/Individual/Individual";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";

export const SignUp = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [CooporateSignUp, setCooporateSignUp] = useState(false);
  const [IndiviualSignUp, setIndiviualSignUp] = useState(false);
  const [StudentSignUp, setStudentSignUp] = useState(false);

  const handleButtonClick = (buttonType) => {
    if (activeButton === buttonType) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonType);
    }
  };

  const handleNext = (userType) => {
    if (userType === "Corporate") {
      setCooporateSignUp(true);
    } else if (userType === "Individual") {
      setIndiviualSignUp(true);
    } else {
      setStudentSignUp(true);
    }
  };

  return (
    <>
      {!CooporateSignUp && !IndiviualSignUp && !StudentSignUp && (
        <div className="h-screen flex">
          <div className="lg:w-[50%] bg-base h-screen hidden lg:flex lg:flex-col lg:justify-between px-[60px] pt-8 ">
            <div>
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
          <div className="lg:w-[50%] h-screen px-8 sm:px-10 lg:px-20 py-10 flex flex-col justify-between items-center">
            <div>
              <h2 className="text-twentyPixels md:text-thirtyPixels lg:text-thirtyPixels font-bold">
                Get Started
              </h2>

              <ProgressBar />

              <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
                Select what you have and would love to protect by using our
                insurance packages
              </p>
              <RegButton
                text="text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels text-black font-semibold text-left"
                w="w-full"
                rounded="rounded-[8px]"
                className={`mt-8 border border-2 border-gray bg-white font-bold ${
                  activeButton === "Corporate" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Corporate")}
                isActive={activeButton === "Corporate"}
                setIsActive={setIsActive}
              >
                Corporate
              </RegButton>
              <RegButton
                text="text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels text-black font-semibold text-left"
                w="w-full"
                rounded="rounded-[8px]"
                className={`mt-2 border border-2 border-gray bg-white font-bold ${
                  activeButton === "Individual" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Individual")}
                isActive={activeButton === "Individual"}
              >
                Individual
              </RegButton>
              <RegButton
                text="text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels text-black font-semibold text-left"
                w="w-full"
                rounded="rounded-[8px]"
                className={`mt-2 border border-2 border-gray bg-white font-bold ${
                  activeButton === "Student" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Student")}
                isActive={activeButton === "Student"}
              >
                Student
              </RegButton>
            </div>
            <div className="lg:mb-4 w-full">
              <Button
                text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
                w="w-full"
                className="mt-8"
                onClick={() => handleNext(activeButton)}
              >
                Next
              </Button>
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

      {CooporateSignUp && <Coorporate />}
      {IndiviualSignUp && <Individual />}
      {StudentSignUp && <Student />}
    </>
  );
};
