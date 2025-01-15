import { configureStore } from '@reduxjs/toolkit';
import { api } from './rtkQuery/authQuery';
import { postApi } from './rtkQuery/postQuery';
import authReducer from './redux/authSlice';
import postReducer from './redux/postSlice';

const store = configureStore({
  reducer: {
    authSlice: authReducer,
    postSlice: postReducer,
    [api.reducerPath]: api.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, postApi.middleware),
});

export default store;