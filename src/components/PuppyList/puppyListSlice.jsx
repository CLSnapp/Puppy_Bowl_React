import api from "../../store/api";

const puppyListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => ({
        url: "/players",
        method: "GET",
      }),
      providesTags: ["Puppy"],
    }),
  }),
});
export const { useGetPuppiesQuery } = puppyListApi;
