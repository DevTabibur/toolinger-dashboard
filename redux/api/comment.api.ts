import { tagTypes } from '../tag-types';
import { baseAPI } from './baseApi';

const commentURL = `/v1/comment`;

const commentApi = baseAPI.injectEndpoints({
  endpoints: build => ({
    //** get comment for a single course */
    getCommentForSingleCourse: build.query({
      query: courseId => ({
        url: `${commentURL}/course/${courseId}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.comment],
    }),
    //** Anyone can comment on a single course */
    createCommentForSingleCourse: build.mutation({
      query: data => ({
        url: `${commentURL}/course/${data.courseId}`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    //** Reply to a Comment (admin & teacher)*/

    replyToComment: build.mutation({
      query: data => ({
        url: `${commentURL}/course/reply/${data.courseId}`,
        method: 'POST',
        data: data,
      }),
    }),
  }),
});

export const {
  useGetCommentForSingleCourseQuery,
  useCreateCommentForSingleCourseMutation,
  useReplyToCommentMutation,
} = commentApi;