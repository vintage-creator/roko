import React, { useState, useEffect } from "react";
import { SideBar } from "./SideBar";
import { DashNav } from "./DashNav";
import { DashboardComponent } from "./DashboardComponent/DashboardComponent";
import { SettingsComponent } from "./SettingsComponent/SettingsComponent";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardComponent />;
      case "settings":
        return <SettingsComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-[#f9f7f7]">
      <SideBar handleDashboardClick={handleTabClick} />
      <div className="w-[100%]">
        <DashNav activeTab={activeTab} />
        <div className="px-10 py-2">{renderTabComponent()}</div>
      </div>
    </div>
  );
};
