import React from "react";
import course from "../../../assets/medcourse.jpeg";

export const ExploreCourses = () => {
  return (
    <div>
      <div className="py-2 pb-8 lg:py-8 lg:pl-10">
        <p className="text-secOrange font-semibold text-center">
          Recommended for you
        </p>

        <h4 className="text-[25px] lg:text-[40px] leading-[25px] lg:leading-[40px] font-bold text-center">
          Explore our top courses
        </h4>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 px-4 lg:px-10 items-center">
        <div className="w-[100%] sm:w-[60%]">
          <img src={course} alt="course_image" className="w-[100%]" />
        </div>
        <div className="w-[100%]  sm:w-[60%]">
          <img src={course} alt="course_image" className="w-[100%]" />
        </div>
        <div className="w-[100%]  sm:w-[60%]">
          <img src={course} alt="course_image" className="w-[100%]" />
        </div>
      </div>
    </div>
  );
};
