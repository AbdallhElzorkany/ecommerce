import { auth } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
interface DecodedToken {
  id: string;
}
export default async function OrdersPage() {
  const session = await auth();
  const { id } = jwtDecode<DecodedToken>(session?.accessToken || "");
  const res = await fetch(`${process.env.API_URL}/api/v1/orders/user/${id}`);
  const data = await res.json();
  console.log(data);
  return <h1>Orders</h1>;
}
