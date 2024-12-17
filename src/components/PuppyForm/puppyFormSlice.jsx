import api from "../../store/api";

const puppyFormApi = api.injectEndpoints({
  endpoints: (build) => ({
    addPuppy: build.mutation({
      query: ({ name, breed }) => ({
        url: "/players",
        method: "POST",
        body: {
          name,
          breed,
        },
      }),
      invalidatesTags: ["Puppy"],
    }),
  }),
});

export const { useAddPuppyMutation } = puppyFormApi;
