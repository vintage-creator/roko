import React from "react";
import NavBar from "../../components/NavBar";
import HeroSection from "../../components/HeroSection";

export const Home = () => {
  return (
    <div className="">
      <div className="bg-base">
        <div className="bg-base px-4 md:pb-10 lg:px-10 lg:py-4 lg:pb-16 max-w-[1500px] m-auto">
          <NavBar />
          <HeroSection />
        </div>
      </div>
      <div className="px-4 lg:p-10 max-w-[1500px] m-auto">Body</div>
    </div>
  );
};
