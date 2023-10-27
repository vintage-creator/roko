import React from "react";
import nurse from "../../assets/nurse.png";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import Input from "../Input";

export const Coorporate = () => {
  const handleNext = () => {};

  return (
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

          <ProgressBar />

          <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
            Enjoy amazing insurance services by creating your first account.
            this is only going to take 5 minutes
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="name" className="text-fourteenPixels font-semibold">
              Company Name
            </label>
            <Input
              type="text"
              className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
              placeholder="Enter full name here"
              name="name"
              id="name"
              // value={payload.name}
              // onChange={handlePayload}
              // rightIcon={<MdEmail color="#008080" />}
            />
          </div>
          <div className="flex gap-4 justify-between">
            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="address"
                className="text-fourteenPixels font-semibold"
              >
                Company Address
              </label>
              <Input
                type="text"
                className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                placeholder="Enter address"
                name="address"
                id="address"
                // value={payload.address}
                // onChange={handlePayload}
                // rightIcon={<MdEmail color="#008080" />}
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="state"
                className="text-fourteenPixels font-semibold"
              >
                State
              </label>
              <Input
                type="text"
                className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                placeholder="Enter state"
                name="state"
                id="state"
                // value={payload.state}
                // onChange={handlePayload}
                // rightIcon={<MdEmail color="#008080" />}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="number"
              className="text-fourteenPixels font-semibold"
            >
              Company Number
            </label>
            <Input
              type="text"
              className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
              placeholder="Enter company number"
              name="number"
              id="number"
              // value={payload.number}
              // onChange={handlePayload}
              // rightIcon={<MdEmail color="#008080" />}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="reg_number"
              className="text-fourteenPixels font-semibold"
            >
              Registration Number
            </label>
            <Input
              type="text"
              className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
              placeholder="Enter registration number"
              name="reg_number"
              id="reg_number"
              // value={payload.reg_number}
              // onChange={handlePayload}
              // rightIcon={<MdEmail color="#008080" />}
            />
          </div>
        </div>

        <div className="w-full">
          <Button
            text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
            w="w-full"
            className="mt-8"
            onClick={handleNext}
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
  );
};
