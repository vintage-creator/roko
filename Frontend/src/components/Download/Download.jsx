import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RegButton } from "../Button/RegButton";
import { useMyContext } from "../../context";
import Button from "../Button";

export const Download = ({ setOpenDownloadModal }) => {
  const [activeButton, setActiveButton] = useState(null);
  const { isActive, setIsActive } = useMyContext();

  const handleButtonClick = (buttonType) => {
    if (activeButton === buttonType) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonType);
    }
  };

  return (
    <div className="h-screen w-[50%] bg-white p-10">
      <div className="h-[30px] mb-4 w-[40px] bg-base"></div>
      <div className="flex justify-between">
        <h1 className="text-[24px] font-bold">Download Document</h1>

        <MdOutlineClose
          className="cursor-pointer"
          onClick={() => setOpenDownloadModal(false)}
          size={30}
        />
      </div>
      <div>
        <RegButton
          text="text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels text-black font-semibold text-left"
          w="w-full"
          rounded="rounded-[8px]"
          className={`mt-8 border border-2 border-gray bg-white font-bold ${
            activeButton === "Corporate" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Policy Certificate")}
          isActive={activeButton === "Policy Certificate"}
          setIsActive={setIsActive}
        >
          Policy Certificate
        </RegButton>
        <RegButton
          text="text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels text-black font-semibold text-left"
          w="w-full"
          rounded="rounded-[8px]"
          className={`mt-4 border border-2 border-gray bg-white font-bold ${
            activeButton === "Corporate" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Policy Schedule")}
          isActive={activeButton === "Policy Schedule"}
          setIsActive={setIsActive}
        >
          Policy Schedule
        </RegButton>
        <RegButton
          text="text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels text-black font-semibold text-left"
          w="w-full"
          rounded="rounded-[8px]"
          className={`mt-4 border border-2 border-gray bg-white font-bold ${
            activeButton === "Corporate" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Handbook")}
          isActive={activeButton === "Handbook"}
          setIsActive={setIsActive}
        >
          Handbook
        </RegButton>
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          w="w-full"
          bg="bg-base"
          type="submit"
          // disabled={isEmpty && true}
          className="mt-8"
          // isLoading={isLoading}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
