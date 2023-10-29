import React from "react";
import NavBar from "../../../components/NavBar";
import { SingleCourseHero } from "./SingleCourseHero";

export const SingleCourse = () => {
  return (
    <div className="bg-base">
      <div className="bg-base px-4  lg:px-10  max-w-[1500px] m-auto">
        <NavBar />
      </div>
      <SingleCourseHero />
      
    </div>
  );
};
