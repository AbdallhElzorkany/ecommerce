"use server";

import { VerifyResetCodeFormData } from "@/components/forgot-password/step-two";
import { SignupFormData } from "../app/(auth)/signup/page";
import { ForgotPasswordFormData } from "@/components/forgot-password/step-one";
import { ResetPasswordFormData } from "@/components/forgot-password/step-three";
import { ResetLoggedInPasswordFormData } from "@/app/(account)/account/security/page";
import { ReviewFormData } from "@/components/reviews/addReviewForm";
import { revalidatePath } from "next/cache";
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

export async function createReview(
  productId: string,
  data: ReviewFormData,
  token: string,
) {
  try {
    const req = await fetch(
      `${process.env.API_URL}/api/v1/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          review: data.review,
          rating: Number(data.rating),
        }),
      },
    );
    const res = await req.json();
    revalidatePath(`/products/${productId}`);
    return res;
  } catch (error) {
    return { message: "Internal server error" };
  }
}

export async function updateReview(
  reviewId: string,
  productId: string,
  data: ReviewFormData,
  token: string,
) {
  try {
    const req = await fetch(
      `${process.env.API_URL}/api/v1/reviews/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          review: data.review,
          rating: Number(data.rating),
        }),
      },
    );
    const res = await req.json();
    revalidatePath(`/products/${productId}`);
    return res;
  } catch (error) {
    return { message: "Internal server error" };
  }
}

export async function deleteReview(
  reviewId: string,
  productId: string,
  token: string,
) {
  try {
    await fetch(`${process.env.API_URL}/api/v1/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });
    revalidatePath(`/products/${productId}`);
  } catch (error) {
    return { message: "Internal server error" };
  }
}
