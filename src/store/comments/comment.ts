import { createSlice } from "@reduxjs/toolkit";
import Comment from "../../model/Comment";
import { fetchComments, sendNewComments } from "./comment-thunk";

const initialCommentsState: {
  comments: Comment[];
  status: string;
} = {
  comments: [],
  status: "",
};

const CommentsSlice = createSlice({
  name: "comments",
  initialState: initialCommentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";
        state.comments = Object.keys(payload).map((key) => payload[key]);
      })
      .addCase(sendNewComments.pending, (state) => {
        state.status = "pending";
      })
      .addCase(sendNewComments.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";
        state.comments.unshift(payload);
      });
  },
});

export default CommentsSlice.reducer;
export const CommentsActions = CommentsSlice.actions;
