import { getFromLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/storageKey.constant";
import { tagTypes } from "../tag-types";
import { baseAPI } from "./baseApi";

const SentMessageURL = `/v1/sent-message`;

export const sentMessageApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    //** Send new email */
    sendEmail: build.mutation({
      query: (data) => ({
        url: `${SentMessageURL}`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.sentMessage],
    }),

    //** Get all sent messages */
    getAllSentMessages: build.query({
      query: (params) => ({
        url: `${SentMessageURL}`,
        method: "GET",
        params: params,
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      providesTags: [tagTypes.sentMessage],
    }),

    //** Delete sent message log */
    deleteSentMessage: build.mutation({
      query: (id) => ({
        url: `${SentMessageURL}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage(authKey)}`,
        },
      }),
      invalidatesTags: [tagTypes.sentMessage],
    }),
  }),
});

export const {
  useSendEmailMutation,
  useGetAllSentMessagesQuery,
  useDeleteSentMessageMutation,
} = sentMessageApi;
