"use client";

import { Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Address } from "@/types/address";

interface AddressCardProps {
  address: Address;
  onRemove: (id: string) => void;
}

export function AddressCard({ address, onRemove }: AddressCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-3xl bg-card p-4 shadow-sm ring-1 ring-foreground/5 transition-opacity">
      <div
        title={address.name}
        className=" h-24 w-24 flex items-center justify-center shrink-0 overflow-hidden rounded-2xl bg-muted border border-border shadow-xs shadow-border"
      >
        <MapPin className="size-12 text-primary" />
      </div>

      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="font-semibold text-sm leading-tight line-clamp-2">
              Name: {address.name}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">
              City: {address.city}
            </span>
          </div>

          {/* Remove button */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer "
            onClick={() => onRemove(address._id)}
            aria-label={`Remove ${address.name} from address`}
            id={`remove-address-item-${address._id}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* Price + add to cart button */}
        <p className="text-xs">Phone: {address.phone}</p>
        <p className="text-xs">Address: {address.details}</p>
      </div>
    </div>
  );
}
