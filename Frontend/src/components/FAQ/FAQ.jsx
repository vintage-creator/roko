import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import FAQuestions from "../../utils/data/faq.json";

export const FAQ = () => {
  const [isOpen, setIsOpen] = useState(FAQuestions);

  const handleToggle = (index) => {
    setIsOpen(
      isOpen.map((item, i) =>
        i === index
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };

  return (
    <div className="bg-gray px-4 md:px-10 py-7 md:py-10 2xl:mt-14">
      <div className="max-w-[1500px] m-auto flex flex-col md:flex-row">
        <div className="md:w-[30%]  md:flex md:items-center">
          <h3 className="font-bold text-[25px] lg:text-[40px] md:w-[80%] lg:w-[50%]  leading-[25px] lg:leading-[40px] text-center md:text-left">
            Frequently asked questions
          </h3>
        </div>
        <div className="md:w-[70%] md:flex md:flex-col md:justify-center md:pb-10">
          {isOpen.map((item, index) => (
            <div key={index} className="cursor-pointer">
              <div
                onClick={() => handleToggle(index)}
                className="flex justify-between items-center  mt-8"
              >
                <p className="text-[12px] md:text-[15px] md:text-[20px] font-semibold">{item.question}</p>
                {item.isOpen ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </div>
              {item.isOpen && (
                <p className="mt-5 text-[12px] md:text-[14px] lg:text-[18px]">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
