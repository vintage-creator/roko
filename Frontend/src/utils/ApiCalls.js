import axios from "axios";
import { baseUrl } from "./ApiConfig";

export const CreateAccountApi = (Payload) => {
  console.log("CreateAccountApi", Payload);
  console.log("actualpayload",Payload)
  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/auth/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const SubscriptionApi = (Payload) => {
  
  let data = JSON.stringify(Payload);
  console.log("SubscriptionApi", data);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/subscribe/plan`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const EmailVerifyApi = (emailToken) => {
  console.log("emailToken", emailToken);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/auth/verify?token=${emailToken}`,
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
