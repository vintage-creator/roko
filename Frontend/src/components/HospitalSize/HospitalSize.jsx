import React, { useState } from "react";
import Button from "../Button";
import { MdOutlineClose } from "react-icons/md";
import { SubscriptionApi } from "../../utils/ApiCalls";

export const HospitalSize = ({ setOpenPolicyModal }) => {
  const [selectedBedNumber, setSelectedBedNumber] = useState("");

  const isEmpty = selectedBedNumber === "";

  const handlePayment = async () => {
    try {
      if (selectedBedNumber) {
        const res = await SubscriptionApi({
          hospitalSize: selectedBedNumber,
        });
        console.log("hospitalSize", res);
        if (res?.status === 200) {
          // showToast({ type: "success", message: "Welcome to your Dashboard" });
        }
      }
    } catch (error) {
      showToast({
        message: error.message,
        type: "error",
      });
    } finally {
    }
  };

  return (
    <div className="px-8 bg-white h-screen py-10  flex flex-col items-center">
      <div>
        <div className="flex justify-between">
          <h2 className="text-twentyFourPixels font-bold">Select a Plan</h2>

          <MdOutlineClose
            className="cursor-pointer"
            onClick={() => setOpenPolicyModal(false)}
            size={30}
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label
            htmlFor="bed_number"
            className="text-fourteenPixels font-semibold"
          >
            Select your hospital size (based on the number of beds):
          </label>
          <select
            className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
            value={selectedBedNumber}
            onChange={(e) => setSelectedBedNumber(e.target.value)}
          >
            <option value="">Choose bed number</option>
            <option value="1-20">1-20 beds</option>
            <option value="21-50">21-50 beds</option>
            <option value="51-100">51-100 beds</option>
            <option value="101-500">101-500 beds</option>
            <option value="501-1000">501-1000 beds</option>
            <option value="1001">1001 beds and above</option>
          </select>
        </div>
      </div>

      <div className="w-full mt-8">
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          w="w-full"
          onClick={handlePayment}
          bg={`${isEmpty ? "bg-disabled" : "bg-base"}`}
          disabled={isEmpty && true}
          className={`mt-8 ${isEmpty && "cursor-not-allowed"}`}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};
