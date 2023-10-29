import React from "react";
import doctor from "../../../assets/med_doc.png";
import { CourseDetails } from "./CourseDetails";
import Footer from "../../../components/Footer";

export const SingleCourseHero = () => {
  return (
    <div className="w-full ">
      <div className="h-[220px] lg:h-[370px]  mt-2 lg:mt-6">
        <h1 className="text-[24px] md:text-[30px] lg:text-[50px] leading-[24px] md:leading-[35px] lg:leading-[50px] text-[#fff] font-bold text-center w-[80%] mx-auto">
          Insurance works for you when you blah and protect when you blah and
          protect
        </h1>
        <div
          className="w-[100%] h-[150px] md:h-[200px] lg:h-[400px] mt-8 lg:mt-10"
          style={{
            backgroundImage: `url(${doctor})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <CourseDetails />
        
      </div>
    </div>
  );
};
