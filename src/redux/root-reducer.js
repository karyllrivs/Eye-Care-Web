// import { combineReducers } from 'redux';
import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import { profileReducer } from "./profile/profile.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
});
