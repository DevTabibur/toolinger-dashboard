import { getFromLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/storageKey.constant";
import { tagTypes } from "../tag-types";
import { baseAPI } from "./baseApi";

const CategoryURL = `/v1/blog-category`;

export const blogCategoryApi: any = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    //** Create a new category */
    createCategory: build.mutation({
      query: (categoryData) => ({
        url: `${CategoryURL}`,
        method: "POST",
        data: categoryData,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.blogCategory],
    }),

    //** Get all categories */
    getAllCategories: build.query({
      query: (params) => ({
        url: `${CategoryURL}`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.blogCategory],
    }),

    //** Get a category by slug */
    getCategoryBySlug: build.query({
      query: (slug) => ({
        url: `${CategoryURL}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogCategory],
    }),

    //** Get a single category by ID */
    getCategoryDetails: build.query({
      query: (categoryId) => ({
        url: `${CategoryURL}/${categoryId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      providesTags: [tagTypes.blogCategory],
    }),

    //** Update a category (full update: name, description, etc.) */
    updateCategory: build.mutation({
      query: ({ categoryId, data }) => ({
        url: `${CategoryURL}/${categoryId}`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.blogCategory],
    }),

    //** Delete a category by ID */
    deleteCategory: build.mutation({
      query: (categoryId) => ({
        url: `${CategoryURL}/${categoryId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.blogCategory],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = blogCategoryApi;
