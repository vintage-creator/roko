import React from "react";
import { MdOutlineClose } from "react-icons/md";

export const Download = ({ setOpenDownloadModal }) => {
  return (
    <div className="h-screen w-[50%] bg-white p-10">
      <div className="flex justify-between">
        <h1 className="text-[24px]">Download</h1>
        <MdOutlineClose
          className="cursor-pointer"
          onClick={() => setOpenDownloadModal(false)}
          size={30}
        />
      </div>
    </div>
  );
};
