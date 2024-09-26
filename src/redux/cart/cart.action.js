import { cartSlice } from "./cart.reducer";

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  resetCart,
} = cartSlice.actions;
