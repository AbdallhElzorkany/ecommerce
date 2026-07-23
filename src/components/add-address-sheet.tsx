"use client";

import { useDispatch, useSelector } from "react-redux";
import { CircleAlertIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "@/redux/store";
import { addAddress } from "@/redux/slices/addressesSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { AddressesResponse } from "@/types/address";

interface AddAddressSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  details: z.string().min(1, "Address details are required"),
  phone: z
    .string()
    .length(11, "Phone number must be exactly 11 digits")
    .regex(
      /^01[0|1|2|5][0-9]{8}$/,
      "Phone number must be a valid Egyptian phone number",
    )
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),
  city: z.string().min(1, "City is required"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export function AddAddressSheet({ open, onOpenChange }: AddAddressSheetProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.addresses);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AddressFormData) => {
    const res = await dispatch(addAddress(data));
    const payload = res.payload as AddressesResponse;
    if (payload.status === "success") {
      reset();
      onOpenChange(false);
    } else {
      setError("root", { message: payload.message || "Failed to add address" });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button className="cursor-pointer gap-2" id="add-address-trigger">
          <Plus className="size-4" />
          Add Address
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add New Address</SheetTitle>
          <SheetDescription>
            Fill in the details below to save a new shipping address.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-5 px-6 py-4 overflow-y-auto"
          id="add-address-form"
        >
          {errors.root && (
            <div className="flex items-center justify-center gap-1 rounded-2xl  border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <CircleAlertIcon className="size-4 shrink-0" />
              <span>{errors.root.message}</span>
            </div>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="address-name">Name</FieldLabel>
              <Input
                id="address-name"
                placeholder="e.g. Home, Office"
                {...register("name")}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="address-details">Address Details</FieldLabel>
              <Input
                id="address-details"
                placeholder="Street, building, apartment…"
                {...register("details")}
              />
              {errors.details && (
                <FieldError>{errors.details.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="address-phone">Phone</FieldLabel>
              <Input
                id="address-phone"
                type="tel"
                placeholder="e.g. +20 123 456 7890"
                {...register("phone")}
              />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="address-city">City</FieldLabel>
              <Input
                id="address-city"
                placeholder="e.g. Cairo"
                {...register("city")}
              />
              {errors.city && <FieldError>{errors.city.message}</FieldError>}
            </Field>
          </FieldGroup>

          <SheetFooter className="px-0 pt-2">
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                disabled={isSubmitting}
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="cursor-pointer gap-2"
              id="submit-address-btn"
            >
              {loading && <Spinner className="size-4" />}
              Save Address
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
