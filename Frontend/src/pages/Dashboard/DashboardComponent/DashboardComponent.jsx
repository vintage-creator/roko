import React, { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import Modal from "../../../components/Modal/Modal";
import FileClaim from "../../../components/FileClaim";
import Download from "../../../components/Download";
import { HospitalSize } from "../../../components/HospitalSize/HospitalSize";
import { GetUserProfileApi } from "../../../utils/ApiCalls";

const OrangeStar = () => {
  return <MdStar color="#d1833a" size={12} />;
};

const PlainStar = () => {
  return <MdStar color="#d9d9d9" size={12} />;
};

const DashboardComponent = ({userDetails}) => {
  const [openFileClaimModal, setOpenFileClaimModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
  const [courseProgress, setCourseProgress] = useState([
    { progress: 20 },
    { progress: 50 },
    { progress: 10 },
    { progress: 30 },
  ]);

  // const updateProgress = (index, value) => {
  //   const updatedProgress = [...courseProgress];
  //   updatedProgress[index].progress = value;
  //   setCourseProgress(updatedProgress);
  // };

  const HandleFileClaim = () => {
    setOpenFileClaimModal(true);
  };

  const HandleDownload = () => {
    setOpenDownloadModal(true);
  };

  const PurchasePolicy = () => {
    setOpenPolicyModal(true);
  };

  return (
    <>
      <div>
        <h3 className="font-semibold mt-2 text-[18px]">Active new policy</h3>
        <div className="mt-4 h-40 flex w-full justify-between gap-4">
          <div className="h-48 bg-[#fff] w-[70%] rounded-[10px] shadow-md p-4 flex gap-4">
            <div className="w-[60%] bg-base rounded-[5px] px-4 py-6 flex flex-col gap-6">
              <div className="flex justify-between w-full items-center">
                <div className="flex gap-2 items-center">
                  {/* User avatar */}
                  <div className="w-12 h-12 bg-white rounded-[50%]"></div>
                  <div className="leading-4">
                    <h2 className="text-[20px] text-white font-bold">
                    {userDetails.fullname}
                    </h2>
                    <p className="text-[10px] text-white font-thin">
                    {userDetails.fieldOfPractice}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] text-white font-thin">Asw1234D56</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <h6 className="text-[14px] text-white font-medium">
                    Policy Cost:
                  </h6>
                  <p className="text-[14px] text-white font-regular">
                    $234,456
                  </p>
                </div>
                <div className="flex justify-between">
                  <h6 className="text-[14px] text-white font-medium">
                    Policy Duration:
                  </h6>
                  <p className="text-[14px] text-white font-regular">
                    $234,456
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[40%] flex flex-col gap-4">
              <div className="bg-[#f9f7f7] h-20 rounded-[5px] flex items-center">
                {/* Start Date */}
                <div className="h-8 w-8 mx-4 bg-white"></div>
                <div className="flex flex-col">
                  <p className="text-[10px]">Start Date</p>
                  <p className="font-bold">02/04/2024</p>
                </div>
              </div>
              <div className="bg-[#f9f7f7] h-20 rounded-[5px] flex items-center">
                {/* End Date */}
                <div className="h-8 w-8 mx-4 bg-white"></div>
                <div className="flex flex-col">
                  <p className="text-[10px]">End Date</p>
                  <p className="font-bold">10/04/2026</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <button
                onClick={PurchasePolicy}
                className="flex gap-2 w-full items-center  justify-center text-white font-bold cursor-pointer px-4 py-1 bg-[#545f71] rounded-[5px] h-10"
              >
                Purchase a Policy
              </button>
            </div>
            <div className="flex mt-5 gap-4 justify-end">
              <button
                onClick={HandleFileClaim}
                className="flex gap-2 items-center cursor-pointer px-4 py-1 bg-[#545f71] rounded-[5px] h-10"
              >
                {/* File a Claim button */}
                <h2 className="font-bold text-[#fff]">File a Claim</h2>
              </button>
              <button
                onClick={HandleDownload}
                className="flex gap-2 items-center cursor-pointer px-4 py-1 bg-[#545f71] rounded-[5px] h-10"
              >
                {/* Download button */}
                <h2 className="font-bold text-[#fff]">Download</h2>
              </button>
            </div>
          </div>
        </div>
        <h3 className="font-semibold mt-14 text-[18px]">Courses in progress</h3>
        <div className="flex gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-6">
            {courseProgress.map((course, index) => (
              <div
                key={index}
                className="mt-6 bg-white p-6 w-[100%] shadow-sm flex gap-2 justify-between"
              >
                <div className="bg-[#d9d9d9] w-[100px] h-[100px] rounded-[5px]"></div>
                <div className="flex flex-col justify-between w-[75%] h-[90px]">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[18px] 2xl:text-[20px]">
                      The art to electrotherapy
                    </h4>
                    <div className="flex">
                      <OrangeStar />
                      <OrangeStar />
                      <OrangeStar />
                      <PlainStar />
                      <PlainStar />
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium">by Chuks Deji</p>
                  </div>
                  <div className="flex justify-between items-center ">
                    <div
                      className="bg-white border border-shades relative"
                      style={{
                        width: "70%",
                        height: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        className="bg-base absolute top-0"
                        style={{
                          width: `${course.progress}%`,
                          height: "8px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </div>

                    <div className="w-[20%] text-right">
                      <p className="text-[10px] ">{course.progress}hr read</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex-1"></div>
            <button className="flex  gap-2 items-center cursor-pointer px-4 py-1 bg-[#545f71] rounded-[5px] h-10 mb-8">
              {/* Download button */}
              <h2 className="font-semibold text-[#fff]">Support</h2>
            </button>
          </div>
        </div>
      </div>
      {openFileClaimModal && (
        <Modal>
          <FileClaim setOpenFileClaimModal={setOpenFileClaimModal} />
        </Modal>
      )}
      {openDownloadModal && (
        <Modal>
          <Download setOpenDownloadModal={setOpenDownloadModal} />
        </Modal>
      )}
      {openPolicyModal && (
        <Modal>
          <HospitalSize setOpenPolicyModal={setOpenPolicyModal} />
        </Modal>
      )}
    </>
  );
};

export default DashboardComponent;
