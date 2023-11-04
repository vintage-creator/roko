import axios from "axios";
import { baseUrl } from "./ApiConfig";

export const CreateAccountApi = (Payload) => {
  console.log("CreateAccountApi", Payload);
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
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      //   if (error.response.data.email) {
      //     localStorage.setItem("pendingEmail", Payload.email);
      //     throw new Error(error.response.data.email[0]);
      //   } else if (error.response.data.phone) {
      //     localStorage.setItem("pendingEmail", Payload.email);
      //     throw new Error(error.response.data.phone[0]);
      //   } else if (error.request) {
      //     throw new Error(error.message);
      //   } else {
      //     throw new Error(error.message);
      //   }
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
      //   if (error.response.data.email) {
      //     localStorage.setItem("pendingEmail", Payload.email);
      //     throw new Error(error.response.data.email[0]);
      //   } else if (error.response.data.phone) {
      //     localStorage.setItem("pendingEmail", Payload.email);
      //     throw new Error(error.response.data.phone[0]);
      //   } else if (error.request) {
      //     throw new Error(error.message);
      //   } else {
      //     throw new Error(error.message);
      //   }
    });
};
