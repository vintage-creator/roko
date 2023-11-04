import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import courseImage from "../../../assets/medcourse.jpeg";
import Footer from "../../../components/Footer";

export const CourseDetails = () => {
  const relatedCoursesData = [
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
    <div className="mt-8 lg:my-20">
      <div className="mt-4 md:mt-8 lg:mt-10 px-4  lg:px-10  max-w-[1500px] m-auto">
        <h6 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold ">
          Introduction
        </h6>
        <p className="mt-4 md:mt-6 text-[12px] md:text-[14px] lg:text-[16px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
          impedit quod quas quis similique, expedita in delectus eligendi
          tenetur! Saepe, eligendi labore minima alias odit voluptatibus nemo
          vero dolor culpa tempora. Veniam, repellendus nostrum voluptatum
          officia distinctio, culpa corporis dolore provident modi magni
          eveniet? Veniam atque laborum vitae quo molestias quibusdam voluptatum
          id porro placeat in illo debitis asperiores tempora reiciendis quaerat
          doloremque quis officiis hic, harum cumque. Aspernatur sunt harum
          blanditiis similique suscipit delectus quasi inventore itaque dolor!
          Alias nisi quaerat ex ut deleniti expedita vitae saepe exercitationem
          perspiciatis placeat, quae modi delectus dolores mollitia temporibus?
          Distinctio possimus vel voluptate iusto atque consequatur quo vitae
          placeat natus ipsum fugit suscipit deleniti consectetur magni nesciunt
          repudiandae dicta, officia at debitis, magnam voluptatibus? Recusandae
          hic dignissimos laboriosam molestias fugiat asperiores porro
          cupiditate sapiente voluptates provident autem impedit, amet deserunt,
          quae incidunt dolor? Optio laboriosam obcaecati aperiam? Reprehenderit
          dolorum recusandae inventore mollitia odio error numquam provident
          nobis quos asperiores consectetur, unde tempora earum aliquam magnam
          excepturi dignissimos aut nihil neque. Necessitatibus atque beatae,
          nemo, sint dicta dolore consequuntur officiis, maxime sunt porro
          suscipit corporis hic voluptatum odit deserunt quas eos. Alias
          distinctio eum dolorem nulla assumenda ut quam obcaecati totam
          voluptates sapiente? Dolorum aspernatur doloribus sint optio,
          provident illum debitis, ad nesciunt quidem cum iure vero quisquam
          laudantium labore alias totam obcaecati cupiditate earum, sed
          consequatur. Qui soluta voluptatem eum vero earum culpa explicabo,
          deserunt maiores sunt nisi deleniti ipsa corporis omnis, iusto eos
          sapiente, suscipit tempore sit ducimus. Mollitia enim iusto ea?
          Repudiandae, libero earum. Corrupti quod, quos, animi recusandae
          mollitia quibusdam aliquam obcaecati tempora sed perferendis,
          assumenda cumque cum. Impedit aliquam repellat pariatur laudantium, ea
          iusto corporis sunt nostrum mollitia esse eos cumque rerum et
          inventore iure consequatur ipsa distinctio molestias optio ut numquam
          corrupti nulla ad. Quos vel expedita obcaecati saepe quas ex
          repudiandae eos est consectetur dolores laboriosam placeat, magni
          beatae quibusdam nisi similique voluptatem, provident, dolorum
          asperiores vitae aspernatur perspiciatis voluptates quia! Iste
          repudiandae corrupti est earum voluptatibus iusto dolorum quis
          suscipit. Dicta, cum soluta.
        </p>
      </div>

      <div className="bg-lightGreen py-4 md:py-6 lg:py-10 mt-6 md:mt-10">
        <div className="  px-4  lg:px-10">
          <h6 className="text-[16px] md:text-[18px] lg:text-[20px] font-bold ">
            Related Courses
          </h6>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 px-4 lg:px-10 items-center md:my-5 my-4 lg:my-10 lg:py-10">
          {relatedCoursesData.map((course, index) => (
            <div className="w-[100%]" key={index}>
              <img src={courseImage} alt="course_image" className="w-[100%]" />
              <p className="text-darkGray font-semibold mt-2 text-[12px] lg:text-[14px]">
                {course.subtitle}
              </p>
              <h3 className="text-[18px]  lg:text-[24px] font-bold w-[80%] leading-[20px] lg:leading-[30px] mt-2">
                {course.title}
              </h3>
              <p className="text-darkGray font-semibold mt-2  text-[10px] md:text-[12px] lg:text-[16px] mt-2">
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
      </div>

      <Footer />
    </div>
  );
};
