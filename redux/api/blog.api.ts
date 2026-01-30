import { tagTypes } from "../tag-types";
import { baseAPI } from "./baseApi";

const BlogURL = `/v1/blog`;

export const blogApi: any = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    //** Create a new blog post */
    createBlogPost: build.mutation({
      query: (blogData) => ({
        url: `${BlogURL}`,
        method: "POST",
        data: blogData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Delete a blog post by ID */
    deleteBlog: build.mutation({
      query: (blogId) => ({
        url: `${BlogURL}/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Get a single blog post by ID */
    getBlogDetails: build.query({
      query: (blogId) => ({
        url: `${BlogURL}/${blogId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    //** Get a blog post by slug */
    getBlogBySlug: build.query({
      query: (slug) => ({
        url: `${BlogURL}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    //** Get blogs by categories except for a specific blog ID */
    getBlogsByCategories: build.mutation({
      query: ({ blogId, categories }) => ({
        url: `${BlogURL}/categories/${blogId}`,
        method: "POST",
        data: categories,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Get all blog posts */
    getAllBlogs: build.query({
      query: (params) => ({
        url: `${BlogURL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.blog],
    }),

    //** Update SEO fields for a blog post */
    updateBlogSEO: build.mutation({
      query: ({ blogId, seoData }) => ({
        url: `${BlogURL}/${blogId}/seo`,
        method: "PATCH",
        data: seoData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Update a blog post (full update: title, content, images, etc.) */
    updateBlogPost: build.mutation({
      query: ({ blogId, blogData }) => ({
        url: `${BlogURL}/${blogId}`,
        method: "PATCH",
        data: blogData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Get SEO analytics for a blog post */
    getBlogSEOAnalytics: build.query({
      query: (blogId) => ({
        url: `${BlogURL}/${blogId}/seo-analytics`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    //** Update blog status */
    updateBlogStatus: build.mutation({
      query: ({ blogId, status }) => ({
        url: `${BlogURL}/${blogId}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Get blogs by author ID */
    getBlogsByAuthor: build.query({
      query: (authorId) => ({
        url: `${BlogURL}/author/${authorId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    //** Get blog revisions */
    getBlogRevisions: build.query({
      query: (blogId) => ({
        url: `${BlogURL}/${blogId}/revisions`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    //** Restore blog from revision */
    restoreBlogRevision: build.mutation({
      query: ({ blogId, revisionId }) => ({
        url: `${BlogURL}/${blogId}/restore/${revisionId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Admin: Approve guest blog post */
    approveGuestBlog: build.mutation({
      query: (blogId) => ({
        url: `${BlogURL}/admin/guest/${blogId}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Admin: Reject guest blog post */
    rejectGuestBlog: build.mutation({
      query: (blogId) => ({
        url: `${BlogURL}/admin/guest/${blogId}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Get guest author profile by slug */
    getGuestAuthorProfile: build.query({
      query: (slug) => ({
        url: `${BlogURL}/guest/authors/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    //** Track blog share */
    trackBlogShare: build.mutation({
      query: ({ blogId, platform }) => ({
        url: `${BlogURL}/${blogId}/share`,
        method: "POST",
        data: { platform },
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Track blog view and read time */
    trackBlogView: build.mutation({
      query: ({ blogId, readTime }) => ({
        url: `${BlogURL}/${blogId}/view`,
        method: "POST",
        data: { readTime },
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    //** Get blogs by category slug */
    getBlogsByCategory: build.query({
      query: (slug) => ({
        url: `/v1/categories/${slug}/blogs`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog, tagTypes.blogCategory],
    }),

    //** Create a new tag */
    // createTag: build.mutation({
    //   query: (tagData) => ({
    //     url: `/v1/tags`,
    //     method: "POST",
    //     data: tagData,
    //   }),
    //   invalidatesTags: [tagTypes.blogTag],
    // }), 

    //** Get blogs by tag slug */
    getBlogsByTag: build.query({
      query: (slug) => ({
        url: `/v1/tags/${slug}/blogs`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog, tagTypes.blogTag],
    }),
  }),
});

export const {
  // Blog CRUD operations
  useCreateBlogPostMutation,
  useDeleteBlogMutation,
  useGetBlogDetailsQuery,
  useGetBlogBySlugQuery,
  useGetAllBlogsQuery,
  useUpdateBlogPostMutation,

  // Blog SEO
  useUpdateBlogSEOMutation,
  useGetBlogSEOAnalyticsQuery,

  // Blog categories and filtering
  useGetBlogsByCategoriesMutation,
  useGetBlogsByCategoryQuery,
  useGetBlogsByAuthorQuery,

  // Blog status management
  useUpdateBlogStatusMutation,

  // Blog versioning/revisions
  useGetBlogRevisionsQuery,
  useRestoreBlogRevisionMutation,

  // Guest post management
  useApproveGuestBlogMutation,
  useRejectGuestBlogMutation,
  useGetGuestAuthorProfileQuery,

  // Blog analytics
  useTrackBlogShareMutation,
  useTrackBlogViewMutation,

  // Tags
  // useCreateTagMutation,
  useGetBlogsByTagQuery,
} = blogApi;
