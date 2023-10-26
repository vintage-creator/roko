import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import Input from "../../components/Input";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { OPTPage } from "./OPTPage";

export const ForgotPassword = () => {
  const [openOTP, setOpenOTP] = useState(false);

  const handleReset = () => {
    setOpenOTP(true);
  };

  return (
    <>
      {!openOTP && (
        <div className="h-screen flex">
          <div className="lg:w-[50%] bg-base h-screen hidden lg:flex lg:flex-col lg:justify-between px-[60px] pt-8 ">
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
          <div className="lg:w-[50%] h-screen px-8 sm:px-10 lg:px-20 py-10  flex flex-col justify-between items-center">
            <div>
              <h2 className="text-twentyPixels md:text-thirtyPixels lg:text-thirtyPixels font-bold">
                Forgot Password?
              </h2>

              <p className="mt-4 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
                Recover ypour password by providing the right details and
                inputting the right OTP received.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-fourteenPixels font-semibold"
                >
                  Email Address
                </label>
                <Input
                  type="text"
                  className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  placeholder="xyz@gmail.com"
                  name="email"
                  id="email"
                  rightIcon={<MdEmail color="#008080" />}
                  // value={payload.email}
                  // onChange={handlePayload}
                />
              </div>
            </div>
            <div className="mb-10 lg:mb-16 w-full">
              <Button
                text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
                w="w-full"
                onClick={handleReset}
                className="mt-8"
                // isLoading={isLoading}
              >
                Reset Password
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

      {openOTP && <OPTPage />}
    </>
  );
};
