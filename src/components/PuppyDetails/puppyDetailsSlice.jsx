import api from "../../store/api";

const puppyDetailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppy: build.query({
        query: (id) => ({
          url: `/players/${id}`,
          method: "GET",
        }),
        providesTags: ["Puppy"],
      }),
      deletePuppy: build.mutation({
        query: (id) => ({
          url: `/players/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Puppy"],
      }),
    }),
  });

export const { useGetPuppyQuery, useDeletePuppyMutation } = puppyDetailsApi;