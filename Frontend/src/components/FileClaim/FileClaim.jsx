import React from "react";
import { MdOutlineClose } from "react-icons/md";

export const FileClaim = ({ setOpenFileClaimModal }) => {
  return (
    <div className="h-screen w-[50%] bg-white p-10">
      <div className="flex justify-between">
        <h1 className="text-[24px]">File a Claim</h1>
        <MdOutlineClose
        className="cursor-pointer"
          onClick={() => setOpenFileClaimModal(false)}
          size={30}
        />
      </div>
    </div>
  );
};
