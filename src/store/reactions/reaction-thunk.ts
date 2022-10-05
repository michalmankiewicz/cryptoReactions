import { createAsyncThunk } from "@reduxjs/toolkit";
import { isConstructorDeclaration } from "typescript";
import Reaction from "../../model/Reaction";

export const fetchReactions = createAsyncThunk(
  "reactions/fetchData",
  async () => {
    const response = await fetch(
      "https://cryptoreactions-b8f54-default-rtdb.firebaseio.com/reactions.json"
    );
    const data = await response.json();

    console.log(data);
    return data;
  }
);

export const addReaction = createAsyncThunk(
  "reactions/sendData",
  async (newReaction: Reaction) => {
    const response = await fetch(
      "https://cryptoreactions-b8f54-default-rtdb.firebaseio.com/reactions.json",
      {
        method: "POST",
        body: JSON.stringify(newReaction),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    const data = await response.json();

    console.log(data);
    return newReaction;
  }
);
