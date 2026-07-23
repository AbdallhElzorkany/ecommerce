"use client";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, MapPin } from "lucide-react";

import { AppDispatch, RootState } from "@/redux/store";
import {
  removeAddress,
  clearError,
} from "@/redux/slices/addressesSlice";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AddressCard } from "@/components/cards/address-card";
import { AddAddressSheet } from "@/components/add-address-sheet";
export default function AddressesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { addresses, loading, error } = useSelector(
    (state: RootState) => state.addresses,
  );

  const [sheetOpen, setSheetOpen] = useState(false);


  const handleRemove = useCallback(
    (addressId: string) => {
      dispatch(removeAddress(addressId));
    },
    [dispatch],
  );

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  return (
    <main className="container mx-auto max-w-6xl min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MapPin className="size-7" />
          <h1 className="text-3xl font-bold">
            Your Addresses
            {addresses.length > 0 && (
              <span className="ml-2 text-base font-medium text-muted-foreground">
                ({addresses.length}{" "}
                {addresses.length === 1 ? "address" : "addresses"})
              </span>
            )}
          </h1>
        </div>

        {/* ── Add Address trigger (header) ── */}
        <AddAddressSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive ring-1 ring-destructive/20">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Address list ── */}
      <div className="space-y-5">
        {loading && addresses.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Spinner className="size-8" />
          </div>
        ) : !loading && addresses.length === 0 ? (
          <section className="flex flex-col items-center justify-center gap-6 min-h-full max-w-4xl py-16 mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-muted p-6">
                <MapPin className="size-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Your addresses is empty</h1>
              <p className="text-muted-foreground max-w-xs">
                Looks like you haven&apos;t added any addresses yet. Start
                adding addresses to fill it up!
              </p>
              <Button
                size="lg"
                className="mt-4 cursor-pointer"
                onClick={() => setSheetOpen(true)}
                id="add-address-btn"
              >
                Add Address
              </Button>
            </div>
          </section>
        ) : (
          addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
    </main>
  );
}
