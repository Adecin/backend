import axios from "axios";

const api = axios.create({
  baseURL: "http://3.109.250.135:4035",

  // baseURL: 'http://10.1.1.45:3035',
  // baseURL: "http://localhost:4035",
});

const cancelToken = () => {
  return axios.CancelToken.source();
};

// if (typeof window !== "undefined") {
//   api.defaults.headers.common["Authorization"] =
//     "Bearer " + window.localStorage.getItem("token") || "";
// }

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    ////console.log("response", response);
    return response;
  },
  function (error) {
    if (error?.response?.status === 404) {
     //console.log("unauthorized", error?.response);
    }
    return Promise.reject(error);
  }
);

export { api as axios, cancelToken };
