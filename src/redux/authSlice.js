import { createSlice } from "@reduxjs/toolkit"
import {io } from "socket.io-client"
export const authSlice = createSlice({
 name:"authSlice",
    initialState: {
       
        authUser: null,
        socketConnect:false
    },

    reducers: {
        setAuthUser: (state,actions) => {
          state.authUser = actions.payload
        },

        setSocket: (state, actions) => {
           state.socket = actions.payload
        },

     
    }

})

export const { setAuthUser,setSocket } = authSlice.actions;

export default authSlice.reducer
