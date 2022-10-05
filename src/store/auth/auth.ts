import { createSlice } from "@reduxjs/toolkit";
import { User } from "phosphor-react";
import { sendNewUserData, fetchUserData, changePassword } from "./auth-thunk";

type User = {
  username: string;
  userId: string;
  token: string;
};

const initialAuthState = {
  isAuthenticated: false,

  loggedUser: {
    username: "",
    userId: "",
    token: "",
  },
  status: "",
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, { payload }) {
      state.isAuthenticated = true;
      state.loggedUser = payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.status = "";
      state.loggedUser = {
        username: "",
        userId: "",
        token: "",
      };
      state.errorMessage = "";
      localStorage.removeItem("loggedUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNewUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(sendNewUserData.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.loggedUser = {
          token: payload.idToken,
          username: payload.email.split("@")[0],
          userId: payload.localId,
        };
        state.status = "fullfilled";
        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));
      })
      .addCase(sendNewUserData.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message?.replace("_", " ") || "";
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.loggedUser = {
          token: payload.idToken,
          username: payload.email.split("@")[0],
          userId: payload.localId,
        };
        state.status = "fullfilled";
        localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message?.replace("_", " ") || "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.loggedUser.token = action.payload.idToken;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.error.message?.replace("_", " ") || "";
      });
  },
});

console.log(authSlice.reducer);

export const authActions = authSlice.actions;

export default authSlice.reducer;
