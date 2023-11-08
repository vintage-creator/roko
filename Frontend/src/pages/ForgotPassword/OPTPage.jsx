import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import nurse from "../../assets/nurse.png";
import { NewPassword } from "./NewPassword";
import { useMyContext } from "../../context";
import { ResetEmailApi } from "../../utils/ApiCalls";
import { showToast } from "../../Toastify/Toast";

export const OPTPage = () => {
  const { email } = useMyContext();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (element, index) => {
    const inputValue = element.value;

    // Allowing alphanumeric characters
    if (!/^[0-9a-zA-Z]*$/.test(inputValue)) return;

    setOtp([...otp.map((d, i) => (i === index ? inputValue : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);

      const otpString = otp.join("");

      const res = await ResetEmailApi({ token: otpString });

      if (res?.status === 200) {
        showToast({
          type: "success",
          message: "Successful! Enter your new password",
        });
        setNewPassword(true);
      }
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!newPassword && (
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
                Enter OTP
              </h2>

              <p className="mt-4 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
                Enter code sent to{" "}
                <span className="text-base font-semibold">{email}</span> to
                proceed to reset password. Code is valid for 10 minutes.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between sm:gap-6 gap-3 mt-5">
                  {otp.map((data, index) => {
                    return (
                      <input
                        className="shadow appearance-none border rounded w-10 sm:w-16 text-gray-700 py-2 px-3 text-center leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    );
                  })}
                </div>

                <p className="text-twelvePixels md:text-thirteenPixels lg:text-fourteenPixels font-semibold cursor-pointer mt-4 text-base font-semibold">
                  Resend code{" "}
                </p>
              </div>
            </div>
            <div className="mb-10 lg:mb-16 w-full">
              <Button
                text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
                w="w-full"
                onClick={handleVerify}
                className="mt-8"
                isLoading={isLoading}
              >
                Verify Account
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

      {newPassword && <NewPassword />}
    </>
  );
};
