import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import Input from "../Input";
import Button from "../Button";
import { FileClaimApi } from "../../utils/ApiCalls";
import { showToast } from "../../Toastify/Toast";

export const FileClaim = ({ setOpenFileClaimModal }) => {
  const [hasSupportingDocuments, setHasSupportingDocuments] = useState(false);
  const [payload, setPayload] = useState({
    details: "",
    supportingDocuments: [],
  });
  // console.log("DOCpayload", payload);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayload = (e) => {
    const { name, files } = e.target;

    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]:
        name === "supportingDocuments"
          ? files
            ? [...prevPayload.supportingDocuments, ...files]
            : prevPayload.supportingDocuments
          : e.target.value,
    }));
  };

  const isEmpty = payload.details === "";

  const HandleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await FileClaimApi(payload);
      console.log("FileClaimRes", res);

      if (res?.status === 201) {
        showToast({
          type: "success",
          message: "Claim submitted successfully",
        });
        setOpenFileClaimModal(false);
      }
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = [...payload.supportingDocuments];
    updatedFiles.splice(index, 1);
    setPayload((prevPayload) => ({
      ...prevPayload,
      supportingDocuments: updatedFiles,
    }));
  };

  return (
    <div className="w-[50%] bg-white p-10 h-screen overflow-auto">
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
        <div className="mt-4 flex flex-col gap-2">
          <label
            htmlFor="reg_number"
            className="text-twentyPixels font-semibold"
          >
            Do you have Document(s) to support your Claim?
          </label>
          <div className="flex gap-4">
            <input
              type="checkbox"
              id="supportingDocumentsCheckbox"
              checked={hasSupportingDocuments}
              onChange={() =>
                setHasSupportingDocuments(!hasSupportingDocuments)
              }
            />
            <label htmlFor="supportingDocumentsCheckbox">Yes</label>
            <input
              type="checkbox"
              id="noSupportingDocumentsCheckbox"
              checked={!hasSupportingDocuments}
              onChange={() =>
                setHasSupportingDocuments(!hasSupportingDocuments)
              }
            />
            <label htmlFor="noSupportingDocumentsCheckbox">No</label>
          </div>
        </div>
        {hasSupportingDocuments && (
          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="file" className="text-twentyPixels font-semibold">
              Upload Document (s)
            </label>
            <div className="relative mt-3 mb-2">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                id="supportingDocuments"
                name="supportingDocuments"
                onChange={handlePayload}
                className="hidden"
                multiple // Allow multiple file selection
              />
              <label
                htmlFor="supportingDocuments"
                className="cursor-pointer py-2 px-4 bg-base text-white rounded-md"
              >
                Click to upload your documents
              </label>
            </div>
            {payload.supportingDocuments &&
              payload.supportingDocuments.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-twentyPixels font-semibold">
                    Selected Files:
                  </h3>
                  <ul>
                    {payload.supportingDocuments.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <span
                          className="ml-2 text-red-500 cursor-pointer"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="summary" className="text-twentyPixels font-semibold">
            Description
          </label>
          <textarea
            name="details"
            id="details"
            placeholder="Enter description here"
            value={payload.details}
            onChange={handlePayload}
            cols="10"
            rows="5"
            className="w-full py-3 rounded-[7px] border border-gray px-[18px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
          ></textarea>
        </div>
        <Button
          text="text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels text-white font-semibold"
          w="w-full"
          type="submit"
          bg={`${isEmpty ? "bg-disabled" : "bg-base"}`}
          disabled={isEmpty && true}
          className={`mt-8 ${isEmpty && "cursor-not-allowed"}`}
          isLoading={isLoading}
          onClick={HandleSubmit}
        >
          File Claim
        </Button>
      </div>
    </div>
  );
};
