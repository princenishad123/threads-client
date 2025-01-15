import { createSlice } from "@reduxjs/toolkit"
import reducer from "./authSlice"

export const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        posts: [],
        authors: [],
        notifications:[]
    },
    reducers: {
        setPosts: (state,actions) => {
            state.posts = actions.payload

            

        },
        setAuthors: (state,actions) => {
            state.authors = actions.payload

        },

        addNotification: (state,actions) => {
            state.notifications.push(actions.payload)
        },
        removeNotification: (state,actions) => {
            state.notifications = []
        }
    }
})

export const { setPosts ,setAuthors,addNotification,removeNotification} = postSlice.actions

export default postSlice.reducer