"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import StepOne from "@/components/forgot-password/step-one";
import StepThree from "@/components/forgot-password/step-three";
import StepTwo from "@/components/forgot-password/step-two";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  return (
    <div className="flex h-[calc(100vh-65px)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        {step === 4 ? (
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <CheckCircleIcon className="size-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  Password has been reset successfully!
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can now sign in with your new password.
                </p>
              </div>
              <Button asChild className="w-full mt-4 cursor-pointer">
                <Link href="/signin">Go to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight text-center">
                {step === 1 && "Forgot Password"}
                {step === 2 && "Verify Code"}
                {step === 3 && "Reset Password"}
              </CardTitle>
              <CardDescription className="text-center">
                {step === 1 &&
                  "Enter your email address to reset your password"}
                {step === 2 && `Code has been sent to ${email}`}
                {step === 3 && "Enter your new password"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {step === 1 && <StepOne setStep={setStep} setEmail={setEmail} />}
              {step === 2 && <StepTwo setStep={setStep} />}
              {step === 3 && <StepThree setStep={setStep} email={email} />}
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
