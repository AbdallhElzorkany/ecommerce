import { OrderCard } from "@/components/cards/order-card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { OrdersResponse, Order } from "@/types/order";
import { jwtDecode } from "jwt-decode";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
export default async function OrdersPage() {
  const session = await auth();
  const { id } = session?.accessToken
    ? jwtDecode<{ id: string }>(session.accessToken)
    : { id: "" };
  const res = await fetch(`${process.env.API_URL}/api/v1/orders/user/${id}`);
  const orders: OrdersResponse = await res.json();

  return (
    <main className="container mx-auto max-w-6xl min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingBag className="size-7" />
          <h1 className="text-xl font-bold">
            Your Orders
            {orders.length > 0 && (
              <span className="ml-2 text-base font-medium text-muted-foreground">
                ({orders.length} {orders.length === 1 ? "order" : "orders"})
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* ── Orders list ── */}
      <div className="space-y-5">
        {orders.length === 0 ? (
          <section className="flex flex-col items-center justify-center gap-6 min-h-full max-w-4xl py-16 mx-auto px-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-muted p-6">
                <ShoppingBag className="size-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Your Orders is empty</h1>
              <p className="text-muted-foreground max-w-xs">
                Looks like you haven&apos;t placed any order yet. Start shopping
                to fill it up!
              </p>
              <Button className="mt-4 cursor-pointer" size="lg">
                <Link href={"/products"}>Browse Products</Link>
              </Button>
            </div>
          </section>
        ) : (
          orders.toReversed().map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}
      </div>
    </main>
  );
}
