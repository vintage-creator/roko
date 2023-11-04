import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import { CreateAccountApi, SubscriptionApi } from "../../utils/ApiCalls";

export const IndividualStep5 = ({ setFormData, formData }) => {
  const {
    activeStep,
    setActiveStep,
    StepThree,
    setStepThree,
    StepFive,
    setStepFive,
    setStepFour,
  } = useMyContext();

  const [payload, setPayload] = useState({
    ...formData,
    plan_duration: "Choose duration",
  });

  console.log("payload", payload);

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      // setIsLoading(true);
      const response = await CreateAccountApi(payload);
      console.log("SignUpresponse", response);
    } catch (error) {
      console.error("Error creating an account", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setStepFive(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const isPlanDurationSelected = payload.plan_duration === "Choose duration";

  const handleHospitalSizeChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));

    // HospitalSize();
  };

  // const HospitalSize = async () => {
  //   try {
  //     const response = await SubscriptionApi({
  //       hospitalSize: payload.hospitalSize,
  //     });
  //     console.error("HospitalSizeRes", response);
  //   } catch (error) {
  //     console.error("Error fetching hospital size:", error);
  //   }
  // };

  const detailsByHospitalSize = {
    "1-20": {
      cost: "₦50,000",
      coverage: "Up to 50,000 NGN coverage.",
      bedsCovered: "Cover up to 20 beds.",
      staffCovered: "Cover for 8 staff.",
    },
    "21-50": {
      cost: "₦70,000",
      coverage: "Up to 70,000 NGN coverage.",
      bedsCovered: "Cover up to 50 beds.",
      staffCovered: "Cover for 13 staff.",
    },
    "51-100": {
      cost: "₦130,000",
      coverage: "Up to 130,000 NGN coverage.",
      bedsCovered: "Cover up to 100 beds.",
      staffCovered: "Cover for 20 staff.",
    },
    "101-500": {
      cost: "₦180,000",
      coverage: "Up to 180,000 NGN coverage.",
      bedsCovered: "Cover up to 500 beds.",
      staffCovered: "Cover for 50 staff.",
    },
    "501-1000": {
      cost: "₦250,000",
      coverage: "Up to 250,000 NGN coverage.",
      bedsCovered: "Cover up to 1000 beds.",
      staffCovered: "Cover for 200 staff.",
    },
    // "1001 and above": {
    //   cost: "Custom",
    //   coverage: "Up to 250,000 NGN coverage.",
    //   bedsCovered: "Cover up to 1000 beds.",
    //   staffCovered: "Cover for 200 staff.",
    // },
  };

  const selectedHospitalDetails = detailsByHospitalSize[payload.hospitalSize];

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
            Select a Plan
          </h2>

          <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
            Enjoy amazing insurance services by creating your first account.
            this is only going to take 5 minutes
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <label
              htmlFor="hospitalSize"
              className="text-fourteenPixels font-semibold"
            >
              Select your hospital size (based on number of beds):
            </label>
            <select
              name="hospitalSize"
              id="hospitalSize"
              value={payload.hospitalSize}
              onChange={handleHospitalSizeChange}
              className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
            >
              <option value="1-20">1-20</option>
              <option value="21-50">21-50</option>
              <option value="51-100">51-100</option>
              <option value="101-500">101-500</option>
              <option value="501-1000">501-1000</option>
            </select>
          </div>

          {/* <div className="border border-gray mt-8 rounded-[8px] px-4 py-6">
            <h4 className="text-[16px] md:text-[20px] lg:text-[24px] text-base font-semibold">
              ₦50,000/
              <span className="text-[14px] md:text-[16px] lg:text-[18px] text-[#00000080] font-bold">
                Annum
              </span>
            </h4>

            <p className="text-[#00000080] mt-4 text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels">
              Stay protected, gain power, knowledge and practical skills from
              our education materials and risk management tools.
            </p>

            <ul className="mt-4">
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Up to 50,000,000 NGN coverage.{" "}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                {" "}
                - Cover for Up to 50 beds.{" "}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Cover for 13 staff.{" "}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Access to educational and risk management materials.{" "}
              </li>
            </ul>
          </div> */}
          <div className="border border-gray mt-8 rounded-[8px] px-4 py-6">
            <h4 className="text-[16px] md:text-[20px] lg:text-[24px] text-base font-semibold">
              {selectedHospitalDetails?.cost}/
              <span className="text-[14px] md:text-[16px] lg:text-[18px] text-[#00000080] font-bold">
                Annum
              </span>
            </h4>

            <p className="text-[#00000080] mt-4 text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels">
              {selectedHospitalDetails?.coverage}
            </p>

            <ul className="mt-4">
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - {selectedHospitalDetails?.bedsCovered}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - {selectedHospitalDetails?.staffCovered}
              </li>
              <li className="text-[10px] md:text-[12px] lg:text-[14px] text-[#00000080] font-bold">
                - Access to educational and risk management materials.{" "}
              </li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <label
              htmlFor="summary"
              className="text-fourteenPixels font-semibold"
            >
              Plan duration
            </label>
            <select
              name="plan_duration"
              id="plan_duration"
              value={payload.plan_duration}
              onChange={handlePayload}
              className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
            >
              <option value="Choose duration">Choose duration</option>

              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
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
              bg={`${isPlanDurationSelected ? "bg-disabled" : "bg-base"}`}
              className={`${
                isPlanDurationSelected ? "cursor-not-allowed" : ""
              }`}
              disabled={isPlanDurationSelected && true}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
