import axios from "axios";

export const CreateAccountApi = (Payload) => {
  console.log("CreateAccountApi", Payload);

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
      }
    });
};

export const EmailVerifyApi = (emailToken) => {
  console.log("emailToken", emailToken);

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
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      }
    });
};

// export const SubscriptionApi = (Payload) => {

//   let data = JSON.stringify(Payload);
//   console.log("SubscriptionApi", data);
//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: `/subscribe/plan`,
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
