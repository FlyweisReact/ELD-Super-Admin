/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";

const Baseurl = process.env.React_App_Baseurl;
const errorMessage = "Something went wrong !";

export const showMsg = (title, message, type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

const handleError = (error, customErrorMsg) => {
  const msg =
    error?.response?.data?.message || errorMessage || "Something went wrong !";
  if (customErrorMsg && !error?.response?.data?.message) {
    showMsg("", customErrorMsg, "danger");
  } else {
    showMsg("", msg, "danger");
  }
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("user-token")}`,
  },
});

const apiRequest = async (method, url, payload = null, options = {}) => {
  const {
    setResponse,
    setLoading,
    additionalFunctions = [],
    successMsg,
    errorMsg,
  } = options;
  if (setLoading) setLoading(true);
  try {
    let response;
    if (method === "get" || method === "delete") {
      response = await axios[method](`${Baseurl}${url}`, getHeaders());
    } else {
      response = await axios[method](`${Baseurl}${url}`, payload, getHeaders());
    }
    if (setResponse) setResponse(response.data);
    if (successMsg) showMsg("", successMsg, "success");
    additionalFunctions.forEach(
      (func) => func && typeof func === "function" && func(response?.data)
    );
  } catch (error) {
    handleError(error, errorMsg);
    if (setResponse) setResponse();
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const getApi = (url, options) => apiRequest("get", url, null, options);
export const postApi = (url, payload, options) =>
  apiRequest("post", url, payload, options);
export const putApi = (url, payload, options) =>
  apiRequest("put", url, payload, options);
export const deleteApi = (url, options) =>
  apiRequest("delete", url, null, options);
