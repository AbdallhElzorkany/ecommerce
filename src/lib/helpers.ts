import { getSession } from "next-auth/react";

export async function authHeaders() {
  const session = await getSession();
  return { token: session?.accessToken ?? "" };
}
