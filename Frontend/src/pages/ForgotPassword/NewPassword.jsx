import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input";
import { NewPasswordApi } from "../../utils/ApiCalls";
import { showToast } from "../../Toastify/Toast";

export const NewPassword = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [payload, setPayload] = useState({
    password: "",
    confirm_password: "",
  });

  console.log("NewPasswordPayload", payload);

  const handlePayload = (event) => {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleReset = async () => {
    try {
      setIsLoading(true);

      const res = await NewPasswordApi(payload);

      if (res?.status === 200) {
        showToast({
          type: "success",
          message: "Successful! Your password has been changed",
        });
        nav("/login");
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
    <div className="h-screen flex ">
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
            New Password
          </h2>

          <p className="mt-4 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
            Enter unique password to protect your account from unwanted access.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-fourteenPixels font-semibold"
            >
              Password
            </label>
            <Input
              className=" w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
              placeholder="************"
              name="password"
              id="password"
              value={payload.password}
              onChange={handlePayload}
              type="password"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-fourteenPixels font-semibold"
            >
              Confirm Password
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
        <div className="mb-10 lg:mb-16 w-full">
          <Button
            text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
            w="w-full"
            onClick={handleReset}
            className="mt-8"
            isLoading={isLoading}
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
  );
};
