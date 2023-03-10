import axios from "axios";
import { API_URL } from "./constants";

export const getCall = async ({ path }) => {
  let [isApiConnectionSucceess, data] = [false, {}];
  const API_PATH = API_URL + path;
  try {
    let response = await axios.get(API_PATH, {
    });
    return { isApiConnectionSucceess: true, data: response.data };
  } catch (e) {
    return { isApiConnectionSucceess, data };
  }
};
export const putCall = async ({ path, updatedData }) => {
  let [isApiConnectionSucceess, data] = [false, {}];
  const API_PATH = API_URL + path;
  try {
    let response = await axios.put(
      API_PATH,
      {
        data: { updatedData },
      },
    );
    return { isApiConnectionSucceess: true, data: response.data };
  } catch (e) {
    return { isApiConnectionSucceess, data };
  }
};
export const postCall = async ({ path, Data }) => {
  let [isApiConnectionSucceess, data] = [false, {}];
  const API_PATH = API_URL + path;
  try {
    let response = await axios({
      method: "post",
      url: API_PATH,
      data: {
        ...Data,
      },
    });
    return { isApiConnectionSucceess: true, data: response.data };
  } catch (e) {
    return { isApiConnectionSucceess, data, e };
  }
};

export const deleteCall = async ({ path, dataObj }) => {
  let [isApiConnectionSucceess, data] = [false, {}];
  const API_PATH = API_URL + path + dataObj;
  try {
    let response = await axios.delete(API_PATH, {
    });
    return { isApiConnectionSucceess: true, data: response.data };
  } catch (e) {
    return { isApiConnectionSucceess, data };
  }
};
