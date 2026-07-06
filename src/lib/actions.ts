"use server";

import { verifyResetCodeFormData } from "@/components/forgot-password/step-two";
import { SignupFormData } from "../app/(auth)/signup/page";
import { forgotPasswordFormData } from "@/components/forgot-password/step-one";
import { resetPasswordFormData } from "@/components/forgot-password/step-three";

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
    return { message: "Internal server error" };
  }
}

export async function forgotPassword(data: forgotPasswordFormData) {
  try {
    const req = await fetch(
      `${process.env.API_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const res = await req.json();
    return res;
  } catch (error) {
    return { message: "Internal server error" };
  }
}

export async function verifyResetCode(data: verifyResetCodeFormData) {
  try {
    const req = await fetch(
      `${process.env.API_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const res = await req.json();
    return res;
  } catch (error) {
    return { message: "Internal server error" };
  }
}
export async function resetPassword(data: resetPasswordFormData) {
  try {
    const req = await fetch(
      `${process.env.API_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const res = await req.json();
    return res;
  } catch (error) {
    return { message: "Internal server error" };
  }
}
