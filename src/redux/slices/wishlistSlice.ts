import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { authHeaders } from "@/lib/helpers";
import { wishlistResponse } from "@/types/wishlist";
import { Product } from "@/types/product";

interface AddItemResponse {
  response: wishlistResponse;
  product: Product;
}

interface wishlistState {
  wishlist: Product[];
  count: wishlistResponse["count"];
  loading: boolean;
  error: string | null;
}

const BASE = "https://ecommerce.routemisr.com/api/v1";

export const retrieveWishlist = createAsyncThunk(
  "wishlist/retrieveWishlist",
  async (): Promise<wishlistResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/wishlist`, { headers });
    return res.json();
  },
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (productId: string): Promise<wishlistResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/wishlist/${productId}`, {
      method: "DELETE",
      headers,
    });
    return res.json();
  },
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product: Product): Promise<AddItemResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/wishlist`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
    const response = await res.json();
    return { response, product };
  },
);

const initialState: wishlistState = {
  wishlist: [],
  count: 0,
  loading: true,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(retrieveWishlist.fulfilled, (state, action:PayloadAction<wishlistResponse>) => {
        state.wishlist = action.payload.data as Product[];
        state.count = action.payload.count;
        state.loading = false;
      })
      .addCase(retrieveWishlist.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load wishlist.";
      });

    builder
      .addCase(removeWishlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status === "success") {
          state.count--;
          state.wishlist = state.wishlist.filter(
            (item) => item.id !== action.meta.arg,
          );
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(removeWishlistItem.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to remove item from wishlist.";
      });

    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action:PayloadAction<AddItemResponse>) => {
        state.loading = false;
        if (action.payload.response.status === "success") {
          state.count++;
          state.wishlist.push(action.payload.product);
          toast.success(action.payload.response.message);
        } else {
          toast.error(action.payload.response.message);
        }
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add item to wishlist.";
      });
  },
});

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
