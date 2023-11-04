import React from "react";
import {
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";

export const Footer = () => {
  const listItems = [
    {
      title: "Product",
      size: "[12px] md:text-[16px]",
    },
    {
      title: "Pricing",
      size: "[12px] md:text-[16px]",
    },
    {
      title: "Overview",
      size: "[12px] md:text-[16px]",
    },
    {
      title: "Browse",
      size: "[12px] md:text-[16px]",
    },
    {
      title: "Accessibility",
      size: "[12px] md:text-[16px]",
    },
    {
      title: "Five",
      size: "[12px] md:text-[16px]",
    },
  ];

  return (
    <div className="px-4 lg:px-10 pt-7 md:pt-10 2xl:mt-14 max-w-[1500px] m-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10 lg:gap-40">
        <div className="flex flex-col md:flex-row justify-between md:w-[70%] md:mb-10 gap-8 md:gap-0">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <ul className="flex flex-col leading-10">
                {listItems.map((item, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer font-semibold text-${item.size}`}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:mt-20  md:w-[30%] mb-10 md:mb-0">
          <p className="font-semibold text-[14px] md:text-[16px] lg:text-[18px]">Follow Us</p>
          <ul className="flex gap-4 lg:gap-6 mt-5">
            <FaYoutube size={18} color="#008080" cursor="pointer" />
            <FaFacebookF size={18} color="#008080" cursor="pointer" />
            <FaTwitter size={18} color="#008080" cursor="pointer" />
            <FaInstagram size={18} color="#008080" cursor="pointer" />
            <FaLinkedinIn size={18} color="#008080" cursor="pointer" />
          </ul>
        </div>
      </div>
      <div className="h-[1px] bg-secOrange"></div>
      <div className="flex flex-col md:flex-row justify-between py-5 items-center">
        <div>
          <p className="font-semibold text-[12px] md:text-[16px]">
            ROKO @ 2023. All rights reserved.
          </p>
        </div>
        <div className="font-semibold mt-2 md:mt-0">
          <ul className="flex gap-6 items-center text-[12px] md:text-[16px]">
            <li className="cursor-pointer">Terms</li>
            <li className="cursor-pointer">Privacy</li>
            <li className="cursor-pointer">Contact</li>
            <li className="flex gap-2 items-center">
              <BsGlobe2 color="#008080" />
              EN
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
