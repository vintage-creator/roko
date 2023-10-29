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
  return (
    <div className="px-4 md:px-10 pt-7 md:pt-10 2xl:mt-14 max-w-[1500px] m-auto">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10 lg:gap-40">
        <div className="flex flex-col md:flex-row justify-between md:w-[70%] md:mb-10 gap-8 md:gap-0">
          <div>
            <ul className="flex flex-col leading-10">
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Product
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Pricing
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Overview
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Browse
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Accessibility
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Five
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col leading-10">
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Product
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Pricing
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Overview
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Browse
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Accessibility
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Five
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col leading-10">
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Product
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Pricing
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Overview
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Browse
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Accessibility
              </li>
              <li className="cursor-pointer font-semibold text-[12px] md:text-[16px]">
                Five
              </li>
            </ul>
          </div>
        </div>
        <div className="md:mt-20  md:w-[30%] mb-10 md:mb-0">
          <p className="font-semibold text-[14px] md:text-[18px]">Follow Us</p>
          <ul className="flex gap-4 lg:gap-6 mt-5">
            <li className="cursor-pointer">
              <FaYoutube size={18} />
            </li>
            <li className="cursor-pointer">
              <FaFacebookF size={18} />
            </li>
            <li className="cursor-pointer">
              <FaTwitter size={18} />
            </li>
            <li className="cursor-pointer ">
              <FaInstagram size={18} />
            </li>
            <li className="cursor-pointer">
              <FaLinkedinIn size={18} />
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[1px] bg-secOrange"></div>
      <div className="flex flex-col md:flex-row justify-between py-5 items-center">
        <div>
          <p className="font-semibold text-[12px] md:text-[16px]">ROKO @ 2023. All rights reserved.</p>
        </div>
        <div className="font-semibold mt-2 md:mt-0">
          <ul className="flex gap-6 items-center text-[12px] md:text-[16px]">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Contact</li>
            <li className="flex gap-2 items-center">
              {" "}
              <BsGlobe2 />
              EN
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
