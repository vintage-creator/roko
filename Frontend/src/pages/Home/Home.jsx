import React from "react";
import NavBar from "../../components/NavBar";
import HeroSection from "./HeroSection";
import WhyRoko from "../../components/WhyRoko";
import MoreAboutRoko from "../../components/MoreAboutRoko";
import FAQ from "../../components/FAQ";
import ProtectYourself from "../../components/ProtectYourself";
import Footer from "../../components/Footer";
import Marquee from "react-fast-marquee";

export const Home = () => {
  return (
    <div className="">
      <div className="bg-base">
        <div className="bg-base px-4  lg:px-10  max-w-[1500px] m-auto">
          <NavBar />
          <HeroSection />
        </div>
      </div>
      <div className="bg-gray ">
        <div className="py-4 md:py-8 max-w-[1500px] m-auto">
          <Marquee>
            <h2
              className="flex justify-around text-[12px] md:text-[28px] font-bold"
              style={{ wordSpacing: "40px" }}
            >
              MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER MEDCOVER
            </h2>
          </Marquee>
        </div>
      </div>
      <WhyRoko />
      <MoreAboutRoko />
      <FAQ />
      <ProtectYourself />
      <Footer />
    </div>
  );
};
