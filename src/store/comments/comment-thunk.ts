import { createAsyncThunk } from "@reduxjs/toolkit";
import Comment from "../../model/Comment";

export const fetchComments = createAsyncThunk(
  "comments/fetchData",
  async (reactionId: string | undefined) => {
    const response = await fetch(
      `https://cryptoreactions-b8f54-default-rtdb.firebaseio.com/comments/${reactionId}.json`
    );
    const data = await response.json();

    console.log(data);

    return data;
  }
);

type CommentData = {
  newComment: Comment;
  reactionId: string | undefined;
};

export const sendNewComments = createAsyncThunk(
  "comments/sendData",
  async (commentData: CommentData) => {
    const response = await fetch(
      `https://cryptoreactions-b8f54-default-rtdb.firebaseio.com/comments/${commentData.reactionId}.json`,
      {
        method: "POST",
        body: JSON.stringify(commentData.newComment),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    console.log(data);

    return commentData.newComment;
  }
);
