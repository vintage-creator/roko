import axios from "axios";

const baseURL = "http://localhost:8000"

export const CreateAccountApi = (Payload) => {
  console.log("CreateAccountApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseURL}/auth/signup`,
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
  console.log("emailToken", emailToken);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseURL}/auth/verify?token=${emailToken}`,
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
    url: `${baseURL}/auth/signin`,
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

export const ForgotPasswordApi = (Payload) => {
  console.log("ForgotPasswordApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseURL}/auth/forgot_password`,
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
  console.log("ResetEmailApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseURL}/auth/reset-token`,
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
  console.log("NewPasswordApi", Payload);

  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseURL}/auth/change-password`,
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
    url: `${baseURL}/auth/signup`,
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

// export const SubscriptionApi = (Payload) => {

//   let data = JSON.stringify(Payload);
//   console.log("SubscriptionApi", data);
//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: `${baseURL}/subscribe/plan`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };

//   return axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       return response;
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// };
