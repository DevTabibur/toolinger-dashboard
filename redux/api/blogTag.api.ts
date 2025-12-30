import { getFromLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/storageKey.constant";
import { tagTypes } from "../tag-types";
import { baseAPI } from "./baseApi";

const TagURL = `/v1/blog-tag`;

export const blogTagApi: any = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    //** Create a new tag */
    createTag: build.mutation({
      query: (tagData) => ({
        url: `${TagURL}`,
        method: "POST",
        data: tagData,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.blogTag],
    }),

    //** Get all tags */
    getAllTags: build.query({
      query: (params) => ({
        url: `${TagURL}`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.blogTag],
    }),

    //** Get a Tag by slug */
    getTagBySlug: build.query({
      query: (slug) => ({
        url: `${TagURL}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogTag],
    }),

    //** Get a single tag by ID */
    getTagDetails: build.query({
      query: (tagId) => ({
        url: `${TagURL}/${tagId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      providesTags: [tagTypes.blogTag],
    }),

    //** Update a tag (full update: name, description, etc.) */
    updateTag: build.mutation({
      query: ({ tagId, data }) => ({
        url: `${TagURL}/${tagId}`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.blogTag],
    }),

    //** Delete a tag by ID */
    deleteTag: build.mutation({
      query: (tagId) => ({
        url: `${TagURL}/${tagId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.blogTag],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useGetAllTagsQuery,
  useGetTagDetailsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = blogTagApi;
