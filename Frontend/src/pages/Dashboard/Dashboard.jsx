import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { DashNav } from "./DashNav";
import DashboardComponent from "./DashboardComponent/DashboardComponent";
import { SettingsComponent } from "./SettingsComponent/SettingsComponent";
import { useMyContext } from "../../context";
import { GetUserProfileApi } from "../../utils/ApiCalls";

export const Dashboard = () => {
  const { isAuthenticated } = useMyContext();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const UserProfile = async () => {
    try {
      const res = GetUserProfileApi();
      console.log("UserProfile", res);
      if (res?.status === 200) {
      }else{
        
      }
    } catch (error) {
      showToast({ type: "error", message: error.message });
    }
  };

  useEffect(() => {
    UserProfile();
  }, []);

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
    <>
      {isAuthenticated && (
        <div className="flex bg-[#f9f7f7]">
          <SideBar handleDashboardClick={handleTabClick} />
          <div className="w-full">
            <DashNav activeTab={activeTab} />
            <div
              className="px-4 py-2"
              style={{
                overflowY: "auto",
                maxHeight: "520px",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {renderTabComponent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
