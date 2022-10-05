import { createSlice } from "@reduxjs/toolkit";
import Reaction from "../../model/Reaction";
import { fetchReactions, addReaction } from "./reaction-thunk";

const initialReactionsState: { reactions: Reaction[]; status: string } = {
  reactions: [],
  status: "",
};

const reactionsSlice = createSlice({
  name: "reactions",
  initialState: initialReactionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReactions.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchReactions.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";

        state.reactions = Object.keys(payload).map((key) => payload[key]);
      })
      .addCase(fetchReactions.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addReaction.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addReaction.fulfilled, (state, { payload }) => {
        state.status = "fullfilled";
        state.reactions.unshift(payload);
      })
      .addCase(addReaction.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default reactionsSlice.reducer;
export const reactionsActions = reactionsSlice.actions;
