import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import addressesReducer from "./slices/addressesSlice";
export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
    addresses: addressesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
