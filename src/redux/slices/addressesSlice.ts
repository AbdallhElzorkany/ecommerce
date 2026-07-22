import { Address, AddressesResponse } from "@/types/address";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authHeaders } from "@/lib/helpers";
import { toast } from "sonner";
const BASE = "https://ecommerce.routemisr.com/api/v1";

export const retrieveAddresses = createAsyncThunk(
  "address/retrieveAddresses",
  async (): Promise<AddressesResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/addresses`, { headers });
    return res.json();
  },
);

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async (addressId: string): Promise<AddressesResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/addresses/${addressId}`, {
      method: "DELETE",
      headers,
    });
    return res.json();
  },
);
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address: Address): Promise<AddressesResponse> => {
    const headers = await authHeaders();
    const res = await fetch(`${BASE}/addresses`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        name: address.name,
        details: address.details,
        phone: address.phone,
        city: address.city,
      }),
    });
    return res.json();
  },
);

interface AddressesState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}
const initialState: AddressesState = {
  addresses: [],
  loading: true,
  error: null,
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        retrieveAddresses.fulfilled,
        (state, action: PayloadAction<AddressesResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.addresses = action.payload.data;
          }
          if (action.payload.status !== "success") {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(retrieveAddresses.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load addresses.";
      });

    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAddress.fulfilled,
        (state, action: PayloadAction<AddressesResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.addresses = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(addAddress.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to add address.";
      });

    builder
      .addCase(removeAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        removeAddress.fulfilled,
        (state, action: PayloadAction<AddressesResponse>) => {
          state.loading = false;
          if (action.payload.data) {
            state.addresses = action.payload.data;
          }
          if (action.payload.status === "success") {
            toast.success(action.payload.message);
          } else {
            toast.error(action.payload.message);
          }
        },
      )
      .addCase(removeAddress.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to remove address.";
      });
  },
});

export const { clearError } = addressSlice.actions;

export default addressSlice.reducer;
