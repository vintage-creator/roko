import React from "react";
import NavBar from "../../components/NavBar";
import { CoursesHeroSection } from "./CoursesHeroSection/CoursesHeroSection";
import  ExploreCourses  from "./ExploreCourses";

export const Courses = () => {
  return (
    <div>
      <div className="bg-base ">
        <div className="bg-base px-4 lg:px-10  max-w-[1500px] m-auto">
          <NavBar />
          <CoursesHeroSection />
        </div>
      </div>
      <ExploreCourses />
    </div>
  );
};
