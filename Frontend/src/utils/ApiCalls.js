import axios from "axios";

const baseURL = "http://localhost:8000";

export const CreateAccountApi = (Payload) => {
  // console.log("CreateAccountApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const EmailVerifyApi = (emailToken) => {
  // console.log("emailToken", emailToken);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/auth/verify?token=${emailToken}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const SignInApi = (Payload) => {
  console.log("SignInApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/signin`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log("apiCall", response);

      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } 
    });
};

export const ForgotPasswordApi = (Payload) => {
  // console.log("ForgotPasswordApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/forgot_password`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const ResetEmailApi = (Payload) => {
  // console.log("ResetEmailApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/reset-token`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const NewPasswordApi = (Payload) => {
  // console.log("NewPasswordApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/change-password`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const LogOutApi = () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/auth/logout`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const SubscriptionApi = (Payload) => {
  console.log("SubscriptionHospitalSizeApi", Payload);

  let data = JSON.stringify(Payload);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/subscribe/plan`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true, 
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

// Function to check payment status
export const checkPaymentStatus = async (txRef) => {
  try {
    const response = await axios.get(
      `/wh/paymentStatus`, { params:{txRef: `${txRef}`} }
    );
    console.log(response, "confirm-payment")
    return response.data;
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

export const GetUserProfileApi = () => {
  const token = localStorage.getItem("token");
 
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/user/getuserprofile`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data) {
        throw new Error(error.response.data);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const FileClaimApi = (Payload) => {
  // console.log("FileClaimApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/user/submitclaim`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data) {
        throw new Error(error.response.data);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};
