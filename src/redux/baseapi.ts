import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://3.109.250.135:4033/",
    prepareHeaders: (headers: any, { getState }: any) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = window.localStorage.getItem("token") || "";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
