import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const ContextProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [StepThree, setStepThree] = useState(false);
  const [StepFour, setStepFour] = useState(false);
  const [StepFive, setStepFive] = useState(false);
  const [StepTwo, setStepTwo] = useState(false);
  const [CooporateSignUp, setCooporateSignUp] = useState(false);
  const [IndiviualSignUp, setIndiviualSignUp] = useState(false);
  const [StudentSignUp, setStudentSignUp] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  const value = {
    activeStep,
    setActiveStep,
    StepThree, setStepThree,
    StepTwo, setStepTwo,
    CooporateSignUp, setCooporateSignUp,
    IndiviualSignUp, setIndiviualSignUp,
    StudentSignUp, setStudentSignUp,
    StepFour, setStepFour, isActive, setIsActive, StepFive, setStepFive,
    isAuthenticated, setIsAuthenticated,
    email, setEmail
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
