import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";
import reactionsReducer from "./reactions/reactions";
import commentsReducer from "./comments/comment";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reactions: reactionsReducer,
    comments: commentsReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
