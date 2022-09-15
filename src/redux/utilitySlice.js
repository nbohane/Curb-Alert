import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
  loading: false,
};

export const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAlert, setLoading } = utilitySlice.actions;

export const selectAlert = (state) => state.utility.alert;
export const selectLoading = (state) => state.utility.loading;

export default utilitySlice.reducer;
