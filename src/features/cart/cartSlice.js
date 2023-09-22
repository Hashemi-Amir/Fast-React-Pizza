import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Peperoni',
  //     quantity: 2,
  //     unitPrice: 26,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      state.cart.map((item) => {
        if (item.pizzaId !== action.payload) return item;
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      });
    },
    decreaseItemQuantity(state, action) {
      state.cart.map((item) => {
        if (item.pizzaId !== action.payload) return item;

        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action);
      });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const getTotalPizzasQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPizzasPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentPizzaQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
