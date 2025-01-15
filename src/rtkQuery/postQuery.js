import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes:['getPostsTag',"getUserPofileTag"],
  baseQuery: fetchBaseQuery({
  baseUrl:`${import.meta.env.VITE_SERVER_URL}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/get-posts",
      providesTags: ["getPostsTag"]
    }),

    getAutherPosts: builder.query({
      query: ({id}) => `/get-authors-posts/${id}`,
    }),


    getComments: builder.query({
      query: ({postId}) => `/get-comments/${postId}`,
      
    }),

    getUserByUsername: builder.query({
      query: (username) => `get-user/${username}`,
      providesTags: (result, error, username) => [{ type: "User", id: username }],
      providesTags: ["getUserPofileTag"]
    }),

    uploadPost: builder.mutation({
      query: (data) => ({
        url: "/upload-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getPostsTag"],
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        try {
          // Optimistic update
          const patchResult = dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.push(data);
            })
          );

          // Await server response
          await queryFulfilled;
        } catch (error) {
          // Rollback in case of error
          patchResult.undo();
        }
      },
    }),

    uploadImage: builder.mutation({
      query: (data) => ({
        url: "/upload-image",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        try {
          // Optimistic update
          const patchResult = dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.push(data);
            })
          );

          // Await server response
          await queryFulfilled;
        } catch (error) {
          // Rollback in case of error
          patchResult.undo();
        }
      },
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/delete-post/${id}`,
        method: "DELETE",
      }),
      
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        try {
          // Optimistic update
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const index = draft.findIndex((post) => post._id === id);
              draft.splice(index, 1);
            })
          );

          // Await server response
          await queryFulfilled;
        } catch (error) {
          // Rollback in case of error
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.push({ _id: id, error: error.message });
            })
          );
        }
      },
    }),

    likePost: builder.mutation({
      query: ({ id }) => ({
        url: `/like/${id}`,
        method: "POST",
      }),
      onQueryStarted: async ({ id, userId }, { dispatch, queryFulfilled }) => {
        try {
          // Optimistic update
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const post = draft.find((post) => post._id === id);

              if (post) {
                // Check if the user has already liked the post
                if (post.likedBy.includes(userId)) {
                  // User has liked the post, so remove the like (dislike it)
                  post.likedBy = post.likedBy.filter((user) => user !== userId); // Remove userId from likedBy
                  post.likeCount -= 1; // Decrement like count
                } else {
                  // User has not liked the post yet, so add the like
                  post.likedBy.push(userId); // Add userId to likedBy
                  post.likeCount += 1; // Increment like count
                }
              }
            })
          );

          // Await server response
          await queryFulfilled;
        } catch (error) {
          // Rollback in case of error
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const post = draft.find((post) => post._id === id);
              if (post) {
                post.likeCount--; // Revert the like count
              }
            })
          );
        }
      },
    }),

    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
      url: `/comment/${postId}`,
      method: "POST",
      body: { comment },
      }),
      onQueryStarted: async ({ postId, comment }, { dispatch, queryFulfilled }) => {
      const patchResult = dispatch(
        postApi.util.updateQueryData("getPosts", undefined, (draft) => {
        const post = draft.find((post) => post._id === postId);
        if (post) {
          post.commentCount++
        }
        })
      );

      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
      },
    }),

    doFollowToUser: builder.mutation({
      query: ({ username }) => ({
        url: `/follow-to-user/${username}`,
        method: "POST",
      }),
      onQueryStarted: async ({ username, userId }, { dispatch, queryFulfilled }) => {
        // Optimistically update the followers data
        const patchResult = dispatch(
          postApi.util.updateQueryData("getUserByUsername", username, (draft) => {
            if (draft) {
              // Ensure draft.followers is an array
              if (!Array.isArray(draft.followers)) {
                draft.followers = [];
              }

              const isFollowing = draft.followers.includes(userId);

              if (isFollowing) {
                // Unfollow: Remove userId from followers list and decrement follower count
                draft.followers = draft.followers.filter((follower) => follower !== userId);
                draft.followerCount -= 1;
              } else {
                // Follow: Add userId to followers list and increment follower count
                draft.followers.push(userId);
                draft.followerCount += 1;
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // If the query fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),

    getNotification: builder.query({
      query: ()=>`/get-notification`
    })
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetNotificationQuery,
  useGetUserByUsernameQuery,
  useUploadPostMutation,
  useUploadImageMutation,
  useLikePostMutation,
  useDoFollowToUserMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useLazyGetCommentsQuery,
  useGetAutherPostsQuery,
  
} = postApi;
