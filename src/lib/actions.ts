"use server";

import { SignupFormData } from "../app/(auth)/signup/page";

export async function signupUser(data: SignupFormData) {
  try {
    const req = await fetch(`${process.env.API_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();
    return res;
  } catch (error) {
    console.error("Signup error:", error);
    return { message: "Internal server error" };
  }
}
