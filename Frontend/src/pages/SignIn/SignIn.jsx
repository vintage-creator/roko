import React, { useState, useEffect } from "react";
import nurse from "../../assets/nurse.png";
import Input from "../../components/Input";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { showToast } from "../../Toastify/Toast";
import { GetUserProfileApi, SignInApi } from "../../utils/ApiCalls";
import { useMyContext } from "../../context";
import { setUserDataWithExpiry } from "../../Auth/Exp";

export const SignIn = () => {
  const { setIsAuthenticated } = useMyContext();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const isEmpty = payload.email === "" || payload.password === "";

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await SignInApi(payload);

      console.log("SignInData", res);

      if (res?.status === 200) {
        const resProfile = await GetUserProfileApi();
        console.log("UserProfile", resProfile);

        const userData = resProfile?.data?.user;

        setUserDataWithExpiry(userData, 5);

        showToast({
          type: "success",
          message: "Welcome to your Dashboard",
        });

        nav("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          showToast({
            message: "User not verified! Please verify your email.",
            type: "error",
          });
        } else if (error.response.status === 404) {
          showToast({
            message: "User not found. Please check your email.",
            type: "error",
          });
        } else if (error.response.status === 500) {
          showToast({
            message: "Incorrect email or password. Please try again.",
            type: "error",
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        showToast({
          message: "Network error. Please check your internet connection.",
          type: "error",
        });
      } else {
        // Something happened in setting up the request that triggered an error
        showToast({
          message: "An unexpected error occurred during sign-in. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center">
      {/* LEFT */}
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

      {/* RIGHT */}
      <form
        onSubmit={handleSignIn}
        className="lg:w-[50%] px-8 sm:px-10 lg:px-20 py-10 flex flex-col justify-between items-center"
      >
        <div className="w-full">
          <h2 className="text-twentyPixels md:text-thirtyPixels lg:text-thirtyPixels font-bold">
            Welcome!
          </h2>

          <p className="mt-4 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
            Enjoy amazing Insurance services today by signing into your account.
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
              className="w-full py-3 px-[8px] rounded-[7px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
              placeholder="xyz@gmail.com"
              name="email"
              id="email"
              value={payload.email}
              onChange={handlePayload}
              rightIcon={<MdEmail color="#008080" />}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-fourteenPixels font-semibold"
            >
              Password
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
            <Link to="/reset-password">
              <p className="text-secondary font-regular text-tenPixels md:text-twelvePixels lg:text-fourteenPixels mt-1 cursor-pointer">
                Forgot Password?
              </p>
            </Link>
          </div>
        </div>
        <div className="mb-10 lg:mb-16 w-full">
          <Button
            text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
            w="w-full"
            bg={`${isEmpty ? "bg-disabled" : "bg-base"}`}
            type="submit" // Add the type to submit the form
            disabled={isEmpty && true}
            className={`mt-8 ${isEmpty && "cursor-not-allowed"}`}
            isLoading={isLoading}
          >
            Sign in
          </Button>
          <Link to="/register">
            <p className="text-twelvePixels md:text-thirteenPixels lg:text-fourteenPixels font-semibold text-center cursor-pointer mt-4">
              Don't have an account yet?{" "}
              <span className="text-secondary">Sign up</span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};
