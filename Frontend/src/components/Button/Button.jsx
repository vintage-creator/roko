import React from "react";

export const Button = ({
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
}) => {
  const combinedClassName = `${bg} ${w} ${h} ${text} ${rounded}  ${
    className || ""
  }`;

  return (
    <button
      className={`${combinedClassName}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};
