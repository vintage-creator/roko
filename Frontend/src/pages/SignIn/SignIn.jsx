import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import Input from "../../components/Input";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const SignIn = () => {
  // const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  // const handleLogIn = async () => {
  //   try {
  //     setIsLoading(true);

  //     if (
  //       payload.email === "" ||
  //       payload.password === ""
  //     ) {
  //       showToast({
  //         message: "Please fill all fields",
  //         type: "error",
  //       });
  //     } else {
  //       const response = await LoginApi(payload);

  //       setPayload({
  //         email: "",
  //         password: "",
  //       });
  //     }
  //   } catch (error) {
  //     showToast({
  //       message: error.message,
  //       type: "error",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className=" flex">
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
      <div className="lg:w-[50%] px-8 sm:px-10 lg:px-20 py-10  flex flex-col justify-between items-center">
        <div>
          <h2 className="text-twentyPixels md:text-thirtyPixels lg:text-thirtyPixels font-bold">
            Get Started
          </h2>

          <p className="mt-4 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
            Enjoy amazing insurance services by creating your first account.
            This is only going to take 5 minutes
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
            // onClick={handleSubmit}
            className="mt-8"
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
      </div>
    </div>
  );
};
