import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartResponse, Cart } from "@/types/cart";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
// ─── Helper ──────────────────────────────────────────────────────────────────
async function authHeaders() {
  const session = await getSession();
  return { token: session?.accessToken ?? "" };
}

const BASE = "https://ecommerce.routemisr.com/api/v2";

export const retrieveCart = createAsyncThunk(
  "cart/retrieveCart",
  async (): Promise<CartResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/cart`, { headers });
    return res.json();
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId: string): Promise<CartResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/cart/${productId}`, {
      method: "DELETE",
      headers,
    });
    return res.json();
  },
);

export const updateCartItemCount = createAsyncThunk(
  "cart/updateCartItemCount",
  async ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }): Promise<CartResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/cart/${productId}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ count }),
    });
    return res.json();
  },
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: string): Promise<CartResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/cart`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    return res.json();
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (): Promise<CartResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/cart`, {
      method: "DELETE",
      headers,
    });
    return res.json();
  },
);

// ─── Initial State ────────────────────────────────────────────────────────────
interface CartState {
  cart: Cart;
  loading: boolean;
  error: string | null;
}
const initialState: CartState = {
  cart: {
    products: [],
    totalCartPrice: 0,
  },
  loading: true,
  error: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    // ── retrieveCart ─────────────────────────────────────────────
    builder
      .addCase(retrieveCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        retrieveCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.cart = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(retrieveCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load cart.";
      });

    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.cart = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add item to cart.";
      });

    // ── removeCartItem ────────────────────────────────────────────
    builder
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        removeCartItem.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.cart = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(removeCartItem.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to remove item.";
      });

    // ── updateCartItemCount ───────────────────────────────────────
    builder
      .addCase(updateCartItemCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateCartItemCount.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.cart = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(updateCartItemCount.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update quantity.";
      });

    // ── clearCart ─────────────────────────────────────────────────
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        clearCart.fulfilled,
        (state, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.cart = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(clearCart.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to clear cart.";
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
