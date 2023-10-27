import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const ContextProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [StepThree, setStepThree] = useState(false);
  const [StepFour, setStepFour] = useState(false);
  const [StepTwo, setStepTwo] = useState(false);
  const [CooporateSignUp, setCooporateSignUp] = useState(false);
  const [IndiviualSignUp, setIndiviualSignUp] = useState(false);
  const [StudentSignUp, setStudentSignUp] = useState(false);

  const value = {
    activeStep,
    setActiveStep,
    StepThree, setStepThree,
    StepTwo, setStepTwo,
    CooporateSignUp, setCooporateSignUp,
    IndiviualSignUp, setIndiviualSignUp,
    StudentSignUp, setStudentSignUp,
    StepFour, setStepFour
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
