// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IDestination from "../Models/IDestination";
// Define a service using a base URL and expected endpoints
export const destinationAPI = createApi({
  reducerPath: "destinationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),

  // tagTypes is related to 'providesTags' and 'invalidatesTags'
  tagTypes: ["DestinationTags"],
  endpoints: (builder) => ({
    // QUERY => GET
    // MUTATION => POST/PUT/DELETE
    getAllDestinations: builder.query<IDestination[], void>({
      query: () => "destinations",
      /**
       * The providesTags property for the query endpoint is used to provide
       * the tag names to caches, and the invalidatesTags property for the
       * mutation endpoint is used to remove them from caches
       */
      providesTags: ["DestinationTags"],
      // transformResponse: (result: IDestination[]) =>
      //   result.sort((a, b) => b.id - a.id),
      transformResponse: (response: IDestination[]) =>
        response.sort((a: { id: number }, b: { id: number }) => b.id - a.id),
    }),

    getDestination: builder.query<IDestination, number>({
      query: (id) => `destinations/${id}`,
      providesTags: (result, error, id) => [{ type: "DestinationTags", id }],
    }),

    addDestination: builder.mutation<IDestination, Partial<IDestination>>({
      query: (formData) => ({
        url: "destinations",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["DestinationTags"],
    }),

    updateDestination: builder.mutation<IDestination, Partial<IDestination>>({
      query: (dest) => ({
        url: `destinations/${dest.id}`,
        method: "PUT",
        body: dest,
      }),
      invalidatesTags: ["DestinationTags"],
    }),

    deleteDestination: builder.mutation<null, number>({
      query: (id) => ({
        url: `destinations/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["DestinationTags"],
    }),
  }),
});

/**
 * Export hooks for usage in function components, which are
 * auto-generated based on the defined endpoints.
 * 'getAllDestinations' should export hooks with 'useGetAllDestinationsQuery'
 * which means, add word 'use' in the first and 'Query' in the end.
 **/
export const {
  useGetAllDestinationsQuery,
  useAddDestinationMutation,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
} = destinationAPI;
