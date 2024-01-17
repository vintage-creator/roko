import React, { useState } from "react";
import nurse from "../../assets/nurse.png";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context";
import Input from "../Input";
import { CreateAccountApi } from "../../utils/ApiCalls";
import { showToast } from "../../Toastify/Toast";
import { SignUpSuccess } from "../SignUpSuccess";

export const IndividualStep5 = ({ setFormData, formData }) => {
  const nav = useNavigate();

  const { activeStep, setActiveStep, setStepFive } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [payload, setPayload] = useState({
    ...formData,
    idType: "",
    idNumber: "",
    bvn: "",
    yes: "",
    no: "",
    summary: "",
  });

  console.log("payload", payload);

  const handleIdTypeChange = (e) => {
    const { value } = e.target;

    setPayload((prevState) => ({
      ...prevState,
      idType: value,
    }));
  };

  const handlePayload = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const isEmpty =
    payload.idNumber === "" ||
    payload.idType === "" ||
    payload.bvn === "" ||
    (payload.yes === "yes" && payload.summary === "");

  const handleCheckboxChange = (checkboxName, e) => {
    const { checked } = e.target;

    setTimeout(() => {
      if (checked) {
        setPayload((prevPayload) => ({
          ...prevPayload,
          [checkboxName]: checkboxName === "yes" ? "yes" : "no",
        }));
        if (checkboxName === "yes") {
          setPayload((prevPayload) => ({ ...prevPayload, no: "" }));
        } else {
          setPayload((prevPayload) => ({ ...prevPayload, yes: "" }));
        }
      } else {
        setPayload((prevPayload) => ({ ...prevPayload, [checkboxName]: "" }));
      }
    }, 0);
  };

  const handlePrevious = () => {
    setStepFive(false);
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmission = async (e) => {
    setLoading(true);
    try {
      const res = await CreateAccountApi(payload);

      console.log("RegData", res);

      if (res?.status === 200) {
        setSuccess(true);

        // nav("/login");
      }
    } catch (error) {
      showToast({
        message: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!success && (
        <div className="flex ">
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

              <ProgressBar
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />

              <p className="mt-8 text-fourteenPixels md:text-sixteenPixels lg:text-eighteenPixels font-regular">
                Enjoy amazing insurance services by creating your first account.
                this is only going to take 5 minutes
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="idType"
                className="text-fourteenPixels font-semibold"
              >
                ID Type
              </label>
              <select
                className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                name="idType"
                id="idType"
                value={payload.idType}
                onChange={handleIdTypeChange}
              >
                <option value="">Choose ID Type</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Permanent Voter's Card">
                  Permanent Voter's Card
                </option>
                <option value="National Identification Number (NIN)">
                  National Identification Number (NIN)
                </option>
                <option value="International Passport">
                  International Passport
                </option>
              </select>
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="text"
                className="text-fourteenPixels font-semibold"
              >
                ID Number
              </label>
              <Input
                type="text"
                className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                placeholder="Enter id number"
                name="idNumber"
                id="idNumber"
                value={payload.idNumber}
                onChange={handlePayload}
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="text"
                className="text-fourteenPixels font-semibold"
              >
                BVN
              </label>
              <Input
                type="text"
                className="w-full py-3 rounded-[7px] px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                placeholder="Enter BVN"
                name="bvn"
                id="bvn"
                value={payload.bvn}
                onChange={handlePayload}
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="legal_action"
                className="text-fourteenPixels font-semibold"
              >
                Any previous legal action?
              </label>
              <div className="flex w-[50%] gap-4">
                <div className="border border-gray flex items-center rounded-[8px] pl-2 py-3 pr-6">
                  <input
                    type="checkbox"
                    name="yes"
                    id="yes"
                    checked={payload.yes === "yes"}
                    onChange={(e) => handleCheckboxChange("yes", e)}
                    className="w-10  px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="border border-gray flex items-center pr-2 rounded-[8px] pl-2 py-3 pr-6">
                  <input
                    type="checkbox"
                    name="no"
                    id="no"
                    checked={payload.no === "no"}
                    onChange={(e) => handleCheckboxChange("no", e)}
                    className="w-10  px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 w-full">
              <label
                htmlFor="summary"
                className="text-fourteenPixels font-semibold"
              >
                If Yes, please summarize here
              </label>
              <textarea
                name="summary"
                id="summary"
                value={payload.summary}
                onChange={handlePayload}
                cols="10"
                rows="5"
                className="w-full py-3 rounded-[7px] border border-gray px-[8px] text-twelvePixels md:text-fourteenPixels lg:text-sixteenPixels outline-none"
              ></textarea>
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
                  onClick={handleSubmission}
                  bg={`${isEmpty ? "bg-disabled" : "bg-base"}`}
                  className={`${isEmpty ? "cursor-not-allowed" : ""}`}
                  disabled={isEmpty && true}
                  isLoading={loading}
                >
                  Submit
                </Button>
              </div>

              <Link to="/login">
                <p className="text-twelvePixels md:text-thirteenPixels lg:text-fourteenPixels font-semibold text-center cursor-pointer mt-4">
                  Already have an account?{" "}
                  <span className="text-secondary">Sign in</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {success && <SignUpSuccess />}
    </>
  );
};
