import { getFromLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/storageKey.constant";
import { tagTypes } from "../tag-types";
import { baseAPI } from "./baseApi";

const UserURL = `/v1/user`;

export const userApi: any = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    //** get all users */
    getAllUsers: build.query({
      query: (params) => ({
        url: `${UserURL}`,
        method: "GET",
        params: params,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      providesTags: [tagTypes.user],
    }),

    //** get single user by id */
    getSingleUserById: build.query({
      query: (userId) => ({
        url: `${UserURL}/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      providesTags: [tagTypes.user],
    }),

    //** update user profile */
    updateProfile: build.mutation({
      query: ({ userId, data }) => ({
        url: `${UserURL}/${userId}`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),

    //** delete user */
    deleteUser: build.mutation({
      query: (userId) => ({
        url: `${UserURL}/${userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} = userApi;
