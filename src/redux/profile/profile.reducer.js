import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUserProfile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUserProfile(state, action) {
      state.currentUserProfile = action.payload;
    },
  },
});

export const profileReducer = profileSlice.reducer;
