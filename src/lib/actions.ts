"use server";

import { VerifyResetCodeFormData } from "@/components/forgot-password/step-two";
import { SignupFormData } from "../app/(auth)/signup/page";
import { ForgotPasswordFormData } from "@/components/forgot-password/step-one";
import { ResetPasswordFormData } from "@/components/forgot-password/step-three";
import { ResetLoggedInPasswordFormData } from "@/app/(account)/account/security/page";
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

export async function forgotPassword(data: ForgotPasswordFormData) {
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

export async function verifyResetCode(data: VerifyResetCodeFormData) {
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
export async function resetPassword(data: ResetPasswordFormData) {
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
export async function resetLoggedInPassword(
  data: ResetLoggedInPasswordFormData,
  token: string,
) {
  try {
    const req = await fetch(
      `${process.env.API_URL}/api/v1/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
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
