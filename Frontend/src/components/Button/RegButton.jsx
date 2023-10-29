import React, { useState } from "react";

export const RegButton = ({
  children,
  className,
  bg = "bg-base",
  w = "w-[123px]",
  h = "h-[42px]",
  text = "text-[#fff]",
  rounded = "rounded-[16px]",
  loadingText = "Please wait . . .",
  disabled = false,
  isLoading = false,
  onClick,
  isActive,
  setIsActive,
}) => {
  const combinedClassName = `${bg} ${w} ${h} ${text} ${rounded} ${
    className || ""
  }`;

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    setIsActive(!isActive);
  };

  return (
    <button
      className={`${combinedClassName} ${
        isActive ? "border-1 border-secOrange" : ""
      }`}
      disabled={isLoading || disabled}
      onClick={handleButtonClick}
    >
      {isLoading ? (
        loadingText
      ) : (
        <div className="flex justify-between px-4">
          {children}
          {isActive && (
            <input
              type="checkbox"
              checked
              readOnly
              style={{ backgroundColor: "#008080" }}
            />
          )}
        </div>
      )}
    </button>
  );
};
