import React from "react";
import courseImage from "../../../assets/medcourse.jpeg";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import { Link, useParams } from "react-router-dom";

export const ExploreCourses = () => {
  // const { id } = useParams();
  const coursesData = [
    {
      title: "A Study on why nurses are cranky for no reason",
      subtitle: "Medical gbas gbos",
      description:
        "Scelerisque auctor dolor diam tortor, fames faucibus non interdum nunc. Ultrices nibh sapien elit gravida ac, rutrum molestie adipiscing lacinia.",
    },
    {
      title: "A Study on why nurses are cranky for no reason",
      subtitle: "Medical gbas gbos",
      description:
        "Scelerisque auctor dolor diam tortor, fames faucibus non interdum nunc. Ultrices nibh sapien elit gravida ac, rutrum molestie adipiscing lacinia.",
    },
    {
      title: "A Study on why nurses are cranky for no reason",
      subtitle: "Medical gbas gbos",
      description:
        "Scelerisque auctor dolor diam tortor, fames faucibus non interdum nunc. Ultrices nibh sapien elit gravida ac, rutrum molestie adipiscing lacinia.",
    },
    {
      title: "A Study on why nurses are cranky for no reason",
      subtitle: "Medical gbas gbos",
      description:
        "Scelerisque auctor dolor diam tortor, fames faucibus non interdum nunc. Ultrices nibh sapien elit gravida ac, rutrum molestie adipiscing lacinia.",
    },
    {
      title: "A Study on why nurses are cranky for no reason",
      subtitle: "Medical gbas gbos",
      description:
        "Scelerisque auctor dolor diam tortor, fames faucibus non interdum nunc. Ultrices nibh sapien elit gravida ac, rutrum molestie adipiscing lacinia.",
    },
    {
      title: "A Study on why nurses are cranky for no reason",
      subtitle: "Medical gbas gbos",
      description:
        "Scelerisque auctor dolor diam tortor, fames faucibus non interdum nunc. Ultrices nibh sapien elit gravida ac, rutrum molestie adipiscing lacinia.",
    },
  ];

  return (
    <div className="max-w-[1500px] m-auto">
      <div className="py-2 pb-8 lg:py-8 lg:pl-10 ">
        <p className="text-secOrange font-semibold text-center text-[14px] md:text-[16px]">
          Recommended for you
        </p>

        <h4 className="text-[20px] lg:text-[40px] leading-[25px] lg:leading-[40px] font-bold text-center">
          Explore our top courses
        </h4>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 px-4 lg:px-10 items-center md:my-5 ">
        {coursesData.map((course, index) => (
          <div className="w-[100%]" key={index}>
            <img src={courseImage} alt="course_image" className="w-[100%]" />
            <p className="text-darkGray font-semibold mt-2 text-[12px] md:text-[14px]">
              {course.subtitle}
            </p>
            <h3 className="text-[18px]  md:text-[24px] font-bold w-[80%] leading-[24px] md:leading-[30px] mt-2">
              {course.title}
            </h3>
            <p className="text-darkGray font-semibold mt-2 text-[14px] md:text-[16px] mt-2">
              {course.description}
            </p>
            <Link to="/courses/:id">
              <Button
                className="mt-4 font-bold hover:bg-secondary hover:text-[#fff] transition duration-500"
                text="text-[10px] lg:text-[16px] text-[#fff]"
                rounded="rounded-[6px]"
                bg="bg-base"
                w="w-[100px] lg:w-[150px]"
                h="h-[30px] lg:h-[42px]"
              >
                Start Course
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="px-4 lg:px-10 my-10 w-full flex justify-center">
        <Button
          className="mt-4 font-bold hover:bg-base hover:text-[#fff] transition duration-500 "
          text="text-[12px] lg:text-[16px] text-[#008080]"
          rounded="rounded-[2px]"
          bg="bg-[#fff]"
          border="border-2 border-base hover:border-0"
          w="w-[140px] w-[220px]"
          h="h-[40px] lg:h-[55px]"
        >
          View more courses
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreCourses;
