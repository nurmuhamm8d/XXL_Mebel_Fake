import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) {
        return;
      }
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
