import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  currentAdmin: null,
  currentPersonnel: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setCurrentAdmin(state, action) {
      state.currentAdmin = action.payload;
    },
    setCurrentPersonnel(state, action) {
      state.currentPersonnel = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
