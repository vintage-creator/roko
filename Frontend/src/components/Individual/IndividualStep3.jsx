import React, { useEffect, useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import steps from "../../utils/data/steps.json";
import { CorporateStep4 } from "../Cooporate/CorporateStep4";
import { IndividualStep4 } from "./IndividualStep4";
import { SubscriptionApi, checkPaymentStatus } from "../../utils/ApiCalls";
import { showToast } from "../../Toastify/Toast";
import { PendingPayment } from "../PendingPayment";
// import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export const IndividualStep3 = ({ setFormData, formData }) => {
  // const publicKey = import.meta.env.FLW_PUBLIC_KEY;
  // console.log(publicKey);

  const [Isloading, setIsLoading] = useState(false);
  const [IsSuccessful, setIsSuccessful] = useState(false);
  const [IsPending, setIsPending] = useState(false);

  const { activeStep, setActiveStep, setStepThree, setStepFour, StepFour } =
    useMyContext();

  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    ...formData,
    plan_duration: "Choose duration",
    hospitalSize: "1-20",
  });

  const { email, firstName, lastName, phone, hospitalSize, plan_duration } =
    payload;

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

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

  const isPlanDurationSelected = payload.plan_duration === "Choose duration";

  const handleHospitalSizeChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  // const handleFlutterWaveButtonClick = () => {
  //   setIsLoading(true);
  // };

  // const config = {
  //   public_key: "FLWPUBK_TEST-6c6621803cf4b5730a2304e17b10e949-X",
  //   tx_ref: Date.now(),
  //   amount: 10000,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: email,
  //     phone_number: phone,
  //     name: firstName,
  //   },
  //   customizations: {
  //     title: "Medcover",
  //     description: "Payment for Insurance Service",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // };

  // const fwConfig = {
  //   ...config,
  //   text: "Proceed with Payment",
  //   callback: (response) => {
  //     console.log(response);
  //     closePaymentModal();
  //     setIsLoading(false);

  //     if (response.status == "successful") {
  //       showToast({
  //         message: "Payment Successful",
  //         type: "success",
  //       });
  //       sendEmail(email);

  //       setTimeout(() => {
  //         setStepFour(true);
  //         if (activeStep < steps.length - 1) {
  //           setActiveStep(activeStep + 1);
  //         }
  //       }, 2000);
  //     } else {
  //       showToast({
  //         message: "Payment not successful",
  //         type: "error",
  //       });
  //     }
  //   },
  //   onClose: () => {},
  // };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await SubscriptionApi({
        email,
        firstName,
        lastName,
        phone,
        hospitalSize,
        plan_duration,
      });

      console.log("respponse", response);

      if (response.data.responseURL) {
        const paymentLink = response.data.responseURL;
        console.log("paymentLink", paymentLink);
        const txRef = response.data.txRef;

        const paymentWindow = window.open(paymentLink);
        // const paymentWindow = window.open(paymentLink, "_blank");

        // Start checking payment status
        // const intervalId = setInterval(async () => {
          try {
            const paymentStatusResponse = await checkPaymentStatus(txRef);
            console.log("paymentStatusResponse", paymentStatusResponse);

            if (paymentStatusResponse?.status === "completed") {
              // Payment was successful, navigate to another page
              // clearInterval(intervalId);
              setStepFour(true);
              if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
              }
              if (paymentWindow) {
                paymentWindow.close();
              }
              showToast({
                message: "Payment was successful!",
                type: "success",
              });
            } else if (paymentStatusResponse?.status === "successful") {
              // Payment was successful, navigate to another page
              // clearInterval(intervalId);
              setStepFour(true);
              if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
              }
              if (paymentWindow) {
                paymentWindow.close();
              }
              showToast({
                message: "Payment was successful!",
                type: "success",
              });
            } else if (paymentStatusResponse?.status === "pending") {
              // setIsPending(true);
              console.log("Payment is still pending...");
            } else {
              // Payment failed or encountered an error, handle accordingly
              // clearInterval(intervalId);
              setStepFour(false);
              showToast({
                message: "Your payment was not successful.",
                type: "error",
              });
            }
          } catch (error) {
            console.error("Error checking payment status:", error);
          }
        // }, 5000);
      } else if (
        response.data.message == "You have already purchased a policy"
      ) {
        setStepFour(true);
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
        showToast({
          message: "Complete your details to start using Medcover",
          type: "success",
        });
      } else if (
        response.data.message == "Already registered. Please sign in!"
      ) {
        navigate("/login");
        showToast({
          message: "Already registered. Please sign in!",
          type: "success",
        });
      }
    } catch (error) {
      showToast({
        message: error.response.data.message,
        type: "error",
      });
      console.error("Error in handlePayment:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setStepThree(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <>
      {!StepFour && !IsPending && (
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
                    - Access to educational and risk management materials.
                  </li>
                </ul>
              </div>

              <div className="mt-4 flex flex-col gap-2">
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
                  //  onClick={handleFlutterWaveButtonClick}
                  // <FlutterWaveButton {...fwConfig} />
                  bg={`${isPlanDurationSelected ? "bg-disabled" : "bg-base"}`}
                  className={`${
                    isPlanDurationSelected ? "cursor-not-allowed" : ""
                  }`}
                  disabled={isPlanDurationSelected && true}
                  isLoading={Isloading}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {StepFour && !IsPending && (
        <IndividualStep4 setPayload={setPayload} payload={payload} />
      )}

      {IsPending && <PendingPayment />}
    </>
  );
};
