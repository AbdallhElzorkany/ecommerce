"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShoppingBag,
} from "lucide-react";

import { RootState, AppDispatch } from "@/redux/store";
import { retrieveCart } from "@/redux/slices/cartSlice";
import { authHeaders } from "@/lib/helpers";
import { AddAddressSheet } from "@/components/add-address-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const CheckoutSchema = z.object({
  shippingAddress: z.object({
    _id: z.string(),
    name: z.string(),
    details: z.string(),
    city: z.string(),
    phone: z.string(),
  }),
  paymentMethod: z.enum(["cash", "card"]),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { cart, loading: cartLoading } = useSelector(
    (state: RootState) => state.cart,
  );
  const { addresses, loading: addressLoading } = useSelector(
    (state: RootState) => state.addresses,
  );

  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getFieldState,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      shippingAddress: {
        _id: "",
        name: "",
        details: "",
        city: "",
        phone: "",
      },
      paymentMethod: "cash",
    },
  });
  console.log(errors);
  const selectedPaymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (!cartLoading && (!cart._id || cart.products.length === 0)) {
      router.push("/account/cart");
    }
  }, [cart, cartLoading, router]);

  // Preselect first address if available and none selected yet
  useEffect(() => {
    if (addresses.length > 0 && !getFieldState("shippingAddress").isTouched) {
      const firstAddr = addresses[addresses.length - 1];
      setValue("shippingAddress", firstAddr, {
        shouldValidate: true,
      });
    }
  }, [addresses, setValue, getFieldState]);
  const onSubmit: SubmitHandler<CheckoutFormData> = async (
    data: CheckoutFormData,
  ) => {
    console.log(data);
    if (!cart._id) {
      toast.error("Cart is empty or not found.");
      return;
    }
    try {
      const headers = await authHeaders();

      if (data.paymentMethod === "cash") {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/${cart._id}`,
          {
            method: "POST",
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shippingAddress: {
                details: data.shippingAddress.details,
                phone: data.shippingAddress.phone,
                city: data.shippingAddress.city,
              },
            }),
          },
        );

        const result = await res.json();

        if (result.status === "success" || result.data) {
          toast.success("Order placed successfully!");
          await dispatch(retrieveCart());
          router.push("/account/allorders");
        } else {
          toast.error(result.message || "Failed to place order.");
        }
      } else if (data.paymentMethod === "card") {
        const origin = window.location.origin + "/account";

        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart._id}?url=${encodeURIComponent(
            origin,
          )}`,
          {
            method: "POST",
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shippingAddress: {
                details: data.shippingAddress.details,
                phone: data.shippingAddress.phone,
                city: data.shippingAddress.city,
              },
            }),
          },
        );

        const result = await res.json();

        if (result.status === "success" && result.session?.url) {
          toast.success("Redirecting to payment gateway...");
          router.push(result.session.url);
        } else {
          toast.error(result.message || "Failed to initiate payment.");
        }
      }
    } catch {
      toast.error("An error occurred while processing your order.");
    }
  };

  const totalCartItems = cart.products.reduce(
    (acc, item) => acc + item.count,
    0,
  );

  return (
    <main className="mx-auto max-w-6xl">
      {/* ── Top Header Navigation ── */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/account/cart")}
          className="cursor-pointer rounded-full hover:bg-muted"
          id="back-to-cart-btn"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Left Column: Shipping & Payment ── */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* ── SECTION 1: Shipping Address ── */}
          <Card className="overflow-hidden border-border/80 shadow-sm pt-0">
            <CardHeader className="bg-muted/30 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      Shipping Address
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Select a saved address or enter delivery details
                    </CardDescription>
                  </div>
                </div>

                <AddAddressSheet open={sheetOpen} onOpenChange={setSheetOpen} />
              </div>
            </CardHeader>

            <CardContent>
              {/* Saved Addresses Selector */}

              {addresses.length > 0 ? (
                <Controller
                  name="shippingAddress"
                  control={control}
                  rules={{
                    required: "Please select a shipping address",
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                    formState,
                  }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addresses.toReversed().map((addr, index) => {
                        const isSelected = value._id === addr._id;
                        return (
                          <label
                            key={addr._id}
                            onClick={() => onChange(addr)}
                            className={`relative cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                              isSelected
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                                : "border-border hover:border-muted-foreground/40 bg-card"
                            }`}
                          >
                            <Input
                              type="radio"
                              id={`address-${addr._id}`}
                              name={`shippingAddress-${index}`}
                              onChange={() => onChange(addr)}
                              checked={isSelected}
                              className="hidden"
                            />
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <MapPin
                                  className={`size-4 ${
                                    isSelected
                                      ? "text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                                <span className="font-semibold text-sm">
                                  {addr.name}
                                </span>
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="size-4 text-primary shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground space-y-0.5">
                              <p className="line-clamp-2 text-foreground/80 font-medium">
                                {addr.details}
                              </p>
                              <p>{addr.city}</p>
                              <p>{addr.phone}</p>
                            </div>
                          </label>
                        );
                      })}
                      {error && (
                        <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-2">
                          {errors.shippingAddress?.root?.message}

                          {formState.errors.shippingAddress?.root?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              ) : (
                <div className="flex items-center justify-center h-40">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <MapPin className="size-6 text-muted-foreground" />
                    </div>
                    <h1 className="text-sm font-bold">
                      Your addresses is empty!
                    </h1>
                    <p className="text-muted-foreground ">
                      Looks like you haven&apos;t added any addresses yet.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── SECTION 2: Payment Method ── */}
          <Card className="overflow-hidden border-border/80 shadow-sm pt-0">
            <CardHeader className="bg-muted/30 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  2
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">
                    Payment Method
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Choose how you would like to pay for your order
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cash Option */}
              <label
                className={`relative cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                  selectedPaymentMethod === "cash"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-border hover:border-muted-foreground/40 bg-card"
                }`}
              >
                <input
                  type="radio"
                  value="cash"
                  className="sr-only"
                  {...register("paymentMethod")}
                />
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <Banknote className="size-6" />
                  </div>
                  <div
                    className={`size-4 rounded-full border flex items-center justify-center ${
                      selectedPaymentMethod === "cash"
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedPaymentMethod === "cash" && (
                      <div className="size-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Pay with cash upon receiving your items
                  </p>
                </div>
              </label>

              {/* Card / Stripe Option */}
              <label
                className={`relative cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                  selectedPaymentMethod === "card"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-border hover:border-muted-foreground/40 bg-card"
                }`}
              >
                <input
                  type="radio"
                  value="card"
                  className="sr-only"
                  {...register("paymentMethod")}
                />
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
                    <CreditCard className="size-6" />
                  </div>
                  <div
                    className={`size-4 rounded-full border flex items-center justify-center ${
                      selectedPaymentMethod === "card"
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedPaymentMethod === "card" && (
                      <div className="size-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-sm">Credit / Debit Card</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Fast & secure online payment via Stripe
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column: Order Summary ── */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 flex flex-col gap-4">
            <Card className="border-border/80 shadow-md pt-0">
              <CardHeader className="bg-muted/20 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <ShoppingBag className="size-5 text-primary" />
                    Order Summary
                  </CardTitle>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    {totalCartItems} {totalCartItems === 1 ? "item" : "items"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-4 flex flex-col gap-4">
                {/* Cart Items Mini List */}
                <div className="max-h-70 overflow-y-auto space-y-3 pr-1">
                  {cart.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 py-1.5 border-b border-border/40 last:border-0"
                    >
                      <div className="relative size-14 rounded-lg overflow-hidden border bg-muted shrink-0">
                        {item.product.imageCover ? (
                          <Image
                            loading="lazy"
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <ShoppingBag className="size-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty:{" "}
                          <span className="font-medium text-foreground">
                            {item.count}
                          </span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold">
                          ${(item.price * item.count).toFixed(2)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Financial Breakdown */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${cart.totalCartPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping Fee</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Free / 100$
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      Free / 20$
                    </span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between font-bold text-base pt-1">
                    <span>Total Amount</span>
                    <span className="text-primary text-lg font-extrabold">
                      ${cart.totalCartPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Place Order CTA Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      isSubmitting ||
                      addressLoading ||
                      cartLoading ||
                      isSubmitSuccessful ||
                      totalCartItems === 0
                    }
                    className="w-full mt-2 font-bold cursor-pointer gap-2 h-12 text-base shadow-sm"
                    id="place-order-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="size-5" />
                        Processing Order...
                      </>
                    ) : selectedPaymentMethod === "card" ? (
                      <>
                        <CreditCard className="size-5" />
                        Pay with Card
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-5" />
                        Place Cash Order
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
