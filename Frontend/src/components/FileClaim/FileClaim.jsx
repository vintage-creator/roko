import React from "react";
import { MdOutlineClose } from "react-icons/md";
import Input from "../Input";
import Button from "../Button";

export const FileClaim = ({ setOpenFileClaimModal }) => {
  return (
    <div className="w-[50%] bg-white p-10">
      <div className="h-[30px] mb-4 w-[40px] bg-base"></div>
      <div className="flex justify-between">
        
        <h1 className="text-[24px] font-bold">File a Claim</h1>

        <MdOutlineClose
          className="cursor-pointer"
          onClick={() => setOpenFileClaimModal(false)}
          size={30}
        />
      </div>
      <div>
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="name" className="text-twentyPixels font-semibold">
            Plan Name
          </label>
          <select className="w-full py-3 rounded-[7px] border border-gray px-[18px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none">
            <option value="None">None</option>
            <option value="name1">Name 1</option>
            <option value="name2">Name 2</option>
            <option value="name3">Name 3</option>
            <option value="name4">Name 4</option>
          </select>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <label
            htmlFor="reg_number"
            className="text-twentyPixels font-semibold"
          >
            Incident Date
          </label>
          <Input
            type="date"
            className="w-full py-3 rounded-[7px] px-[18px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
            name="date"
            id="date"
            // value={payload.reg_number}
            // onChange={handlePayload}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="summary" className="text-twentyPixels font-semibold">
            Brief Description
          </label>
          <textarea
            name="desc"
            id="desc"
            placeholder="Enter description here"
            // value={payload.summary}
            // onChange={handlePayload}
            cols="10"
            rows="5"
            className="w-full py-3 rounded-[7px] border border-gray px-[18px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
          ></textarea>
        </div>
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          w="w-full"
          bg="bg-base"
          type="submit"
          // disabled={isEmpty && true}
          className="mt-8"
          // isLoading={isLoading}
        >
          File Claim
        </Button>
      </div>
    </div>
  );
};
