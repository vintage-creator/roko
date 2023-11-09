import React from "react";

export const DashNav = ({ activeTab }) => {
  return (
    <div className="w-[100%] h-20 bg-[#fff] px-10 flex items-center border-b-2 border-shades">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-[24px] font-bold text-[#008080]">
          {activeTab === "dashboard"
            ? "Dashboard"
            : activeTab === "settings"
            ? "Settings"
            : "Dashboard"}
        </h1>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-base rounded-[50%]"></div>
          <p className="font-semibold text-base">Pelumi Adetoye</p>
        </div>
      </div>
    </div>
  );
};