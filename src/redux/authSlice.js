import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoggedIn = (state) => state.auth.loggedIn;

export default authSlice.reducer;
