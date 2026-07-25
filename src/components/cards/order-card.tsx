import Image from "next/image";
import Link from "next/link";
import {
  Package,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  CircleDollarSign,
} from "lucide-react";
import { Order } from "@/types/order";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OrderCard({ order }: { order: Order }) {
  const itemCount = order.cartItems.reduce((sum, i) => sum + i.count, 0);

  return (
    <div
      className="rounded-3xl bg-card shadow-sm ring-1 ring-foreground/5 overflow-hidden"
      id={`order-card-${order.id}`}
    >
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-muted/40 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
            <Package className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">
              Order #{order.id}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <Calendar className="size-3" />
              <span>{formatDate(order.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Payment badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              order.isPaid
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            {order.isPaid ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <Clock className="size-3.5" />
            )}
            {order.isPaid ? "Paid" : "Unpaid"}
          </span>

          {/* Delivery badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              order.isDelivered
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
            }`}
          >
            {order.isDelivered ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <Truck className="size-3.5" />
            )}
            {order.isDelivered ? "Delivered" : "In Transit"}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 py-4 space-y-4">
        {/* Cart items */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Items ({itemCount})
          </p>
          <div className="flex flex-col gap-3">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3 ring-1 ring-foreground/3"
              >
                <Link
                  href={`/products/${item.product.id}`}
                  className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted border border-border shadow-xs"
                >
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="56px"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="text-sm font-medium leading-tight line-clamp-1 hover:underline"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Qty: {item.count} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-bold shrink-0">
                  ${(item.price * item.count).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Details grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Shipping address */}
          <div className="rounded-2xl bg-muted/30 p-3.5 ring-1 ring-foreground/[0.03] space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Shipping Address
            </p>
            <div className="text-sm space-y-1">
              <p className="font-medium">{order.shippingAddress.city}</p>
              <p className="text-muted-foreground">
                {order.shippingAddress.details}
              </p>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Phone className="size-3" />
                {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Payment info */}
          <div className="rounded-2xl bg-muted/30 p-3.5 ring-1 ring-foreground/[0.03] space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="size-3.5" />
              Payment
            </p>
            <div className="text-sm space-y-1">
              <p className="font-medium capitalize">
                {order.paymentMethodType}
              </p>
              <p className="text-muted-foreground">
                Customer: {order.user.name}
              </p>
              <p className="text-muted-foreground flex items-center gap-1.5">
                <Phone className="size-3" />
                {order.user.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer — Price breakdown ── */}
      <div className="px-5 py-4 border-t border-border bg-muted/20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <span className="text-muted-foreground">
              Shipping:{" "}
              <span className="font-medium text-foreground">
                ${order.shippingPrice.toFixed(2)}
              </span>
            </span>
            <span className="text-muted-foreground">
              Tax:{" "}
              <span className="font-medium text-foreground">
                ${order.taxPrice.toFixed(2)}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="size-5 text-primary" />
            <span className="text-lg font-bold">
              ${order.totalOrderPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}