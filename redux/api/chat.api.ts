import { tagTypes } from '../tag-types';
import { baseAPI } from './baseApi';

const chatURL = `/v1/chat`;

export const chatApi = baseAPI.injectEndpoints({
  endpoints: build => ({
    //** get all chat list */
    getAllChat: build.query({
      query: () => ({
        url: `${chatURL}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.chat],
    }),

    //** create chat */
    createChat: build.mutation({
      query: data => ({
        url: `${chatURL}`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: [tagTypes.chat],
    }),

    //** get chat details between sender & receiver with theirs ID's */
    getChatOfSenderAndReceiver: build.query({
      query: data => ({
        url: `${chatURL}/${data.senderId}/${data?.receiverId}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.chat],
    }),

    //** get chat of sender */

    getChatOfSender: build.query({
      query: data => ({
        url: `${chatURL}/${data.senderId}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.chat],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetAllChatQuery,
  useGetChatOfSenderAndReceiverQuery,
  useGetChatOfSenderQuery,
} = chatApi;