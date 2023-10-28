import React, { useState } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import Logo from "../../assets/home_logo.png";
import { BiMenuAltRight } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const HandleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const HandleCloseMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between items-center py-5 relative">
      <div className="text-twentyPixels lg:text-thirtyPixels text-[#fff] font-bold cursor-pointer">
        <img src={Logo} alt="Logo" className="w-28 lg:w-full" />
      </div>

      {/* Small Screen */}
      {!isOpen && (
        <div className="flex lg:hidden" onClick={HandleOpenMenu}>
          <BiMenuAltRight size={30} color="#fff" />
        </div>
      )}

      {isOpen && (
        <div className="flex lg:hidden z-[999] " onClick={HandleCloseMenu}>
          <IoMdClose size={30} color="#008080" />
        </div>
      )}

      {isOpen && (
        <div className="flex lg:hidden absolute top-0 right-[-16px]  bg-[#fff] w-[150px] h-[100vh] px-5 pt-14 transition duration-200">
          <ul className="flex flex-col gap-4 text-eighteenPixels font-regular text-[#fff]">
            <Link to="/">
              <li className="cursor-pointer font-semibold hover:text-secondary  text-base">
                Home
              </li>
            </Link>
            <Link to="/courses">
              <li className="cursor-pointer font-semibold hover:text-secondary  text-base">
                Courses
              </li>
            </Link>
            <Link to="/about-us">
              <li className="cursor-pointer fot-semibold hover:text-secondary  text-base">
                About Us
              </li>
            </Link>
          </ul>
        </div>
      )}

      {/* Big Screen */}
      <div className="hidden lg:flex">
        <ul className="flex gap-10 text-eighteenPixels font-regular text-[#fff]">
          <Link to="/">
            <li className="cursor-pointer hover:text-secondary">Home</li>
          </Link>
          <Link to="/courses">
            <li className="cursor-pointer hover:text-secondary">Courses</li>
          </Link>
          <Link to="/about-us">
            <li className="cursor-pointer hover:text-secondary">About Us</li>
          </Link>
        </ul>
      </div>
      <div className="hidden lg:flex">
        <Button
          className="font-bold hover:bg-[#fff] hover:text-secondary transition duration-500"
          rounded="rounded-[6px]"
          bg="bg-secondary"
        >
          Button
        </Button>
      </div>
    </div>
  );
};
