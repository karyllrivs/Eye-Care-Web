import { createSlice } from "@reduxjs/toolkit";
const CART_INITIAL_STATE = {
  cartItems: [],
};

// We moved the helper action from cart action.
const addCartItem = (cartItems, { productToAdd, quantity }) => {
  // find if cart item is existing
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToAdd._id
  );

  // check if we have an existingCartItem, we should add the quantity of it and return the new cartItems
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToAdd._id
        ? {
            ...cartItem,
            quantity: Number(cartItem.quantity) + Number(quantity),
          }
        : cartItem
    );
  }

  // return the existing cartItems with the productToAdd and the quantity.
  return [...cartItems, { ...productToAdd, quantity }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem._id !== cartItemToRemove._id
    );
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem._id !== cartItemToClear._id);

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    resetCart(state) {
      state.cartItems = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
