import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
        credentials:'include'
      }),
    
    endpoints: (builder) => ({

        checkAuthUser: builder.query({
            query:()=>'/auth/check-auth'
        }),
      

        signup: builder.mutation({
            query: (data) => ({
                url: "/auth/sign-up",
                method: "POST",
                body:data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body:data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
              
            })
        }),

          updateProfile: builder.mutation({
            query: (data) => ({
                url: "/auth/update-profile",
                method: "PUT",
                body:data
            })
        }),
          uploadProfilePicture: builder.mutation({
            query: (data) => ({
                url: "/auth/upload-profile-picture",
                method: "PUT",
                body:data
            })
          }),

   searchUser: builder.query({
  query: ({ username,limit = 10, }) => ({
    url: `/auth/search-user`,
    params: { username,limit },
  }),
  transformResponse: (response) => response.users, // Correct the field to match backend response
}),

          
    })
})



export const {useCheckAuthUserQuery,useSignupMutation,useLoginMutation,useLogoutMutation,useUpdateProfileMutation, useUploadProfilePictureMutation ,useLazySearchUserQuery} = api