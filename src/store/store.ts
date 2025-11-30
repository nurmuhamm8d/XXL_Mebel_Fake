import { configureStore } from "@reduxjs/toolkit";
import { fakestoreApi } from "@/services/fakestoreApi";
import { cartReducer } from "@/features/cart/cartSlice";
import { authReducer } from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [fakestoreApi.reducerPath]: fakestoreApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakestoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
