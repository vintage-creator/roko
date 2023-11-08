import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { LogOutApi } from "../../utils/ApiCalls";
import { showToast } from "../../Toastify/Toast";
import { useNavigate } from "react-router-dom";

export const SideBar = ({ handleDashboardClick }) => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    handleDashboardClick(tab);
  };

  const HandleLogOut = async () => {
    try {
      const res = await LogOutApi();

      if (res?.status === 200) {
        showToast({
          type: "success",
          message: "Successfully Logged Out",
        });
        nav("/");
      }
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <div className="w-1/5 h-screen bg-white border-r-2 border-shades py-5 px-10 flex flex-col justify-between">
      <div>
        <div className="h-10 bg-base"></div>

        <div className="py-12 flex flex-col gap-4 justify-center">
          <div
            className={`flex gap-2 items-center cursor-pointer  px-6 py-1 ${
              activeTab === "dashboard" && "bg-[#cce6e6]  rounded-[10px]"
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            <MdDashboard size={18} color="#008080" />
            <h2 className="text-[18px] font-semibold text-[#008080]">
              Dashboard
            </h2>
          </div>
          <div
            className={`flex gap-2 items-center cursor-pointer px-6 py-1 ${
              activeTab === "settings" && "bg-[#cce6e6] rounded-[10px] "
            }`}
            onClick={() => handleTabClick("settings")}
          >
            <IoIosSettings size={18} color="#008080" />
            <h2 className="text-[18px] font-semibold text-[#008080]">
              Settings
            </h2>
          </div>
        </div>
      </div>
      <div className="cursor-pointer" onClick={HandleLogOut}>
        <p className="text-red-500 font-bold">Log Out</p>
      </div>
    </div>
  );
};
