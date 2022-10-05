import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "AIzaSyCc_svmDvn9wnPfFtLkeW49pZucKQaxabI";

type User = {
  email: string;
  password: string;
};

export const sendNewUserData = createAsyncThunk(
  "auth/sendData",
  async (userData: User) => {
    const config = {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    const response = await fetch(url, config);

    const data = await response.json();

    if (!response.ok) throw new Error(data.error.message);

    return data;
  }
);

export const fetchUserData = createAsyncThunk(
  "auth/fetchData",
  async (userData: User) => {
    const config = {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    const response = await fetch(url, config);

    const data = await response.json();

    if (!response.ok) throw new Error(data.error.message);

    return data;
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (newPasswordData: { token: string; newPassword: string }) => {
    console.log(newPasswordData);

    const config = {
      method: "POST",
      body: JSON.stringify({
        idToken: newPasswordData.token,
        password: newPasswordData.newPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      config
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    return data;
  }
);
