import { configureStore } from "@reduxjs/toolkit";
import { actionTypes, firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import loadingSlice from "../slices/loadingSlice";
import userSlice from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    user: userSlice,
    firebaseReducer,
    firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
