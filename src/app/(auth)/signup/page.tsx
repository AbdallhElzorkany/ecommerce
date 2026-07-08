"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EyeIcon,
  EyeOffIcon,
  CircleAlertIcon,
  CheckCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { signupUser } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

const signupSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z
      .string()
      .length(11, "Phone number must be exactly 11 digits")
      .regex(
        /^01[0|1|2|5][0-9]{8}$/,
        "Phone number must be a valid Egyptian phone number",
      )
      .regex(/^[0-9]+$/, "Phone must contain only numbers"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
      name: "",
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormData) => {
    const res = await signupUser(data);
    if (res?.message !== "success") {
      setError("root", {
        message: res.message,
      });
      return;
    }

    setIsSuccess(true);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        {isSuccess ? (
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <CheckCircleIcon className="size-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  Account Created
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your account has been successfully created. You can now sign
                  in with your credentials.
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
                Sign Up
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to create your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              {errors.root && (
                <div className="mb-2 flex items-center justify-center gap-1 rounded-2xl  border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <CircleAlertIcon className="size-4 shrink-0" />
                  <span>{errors.root.message}</span>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* Name */}
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="your name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    <FieldError>{errors.name?.message}</FieldError>
                  </Field>
                  {/* Phone */}
                  <Field data-invalid={!!errors.phone}>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                    <FieldError>{errors.phone?.message}</FieldError>
                  </Field>
                  {/* Email */}
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    <FieldError>{errors.email?.message}</FieldError>
                  </Field>

                  {/* Password */}
                  <Field data-invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword.password ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        aria-invalid={!!errors.password}
                        className="pr-10"
                        {...register("password")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            password: !prev.password,
                          }))
                        }
                        aria-label={
                          showPassword.password
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword.password ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                    <FieldError>{errors.password?.message}</FieldError>
                  </Field>
                  {/* Confirm Password */}
                  <Field data-invalid={!!errors.rePassword}>
                    <FieldLabel htmlFor="rePassword">
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="rePassword"
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
                        placeholder="••••••••"
                        autoComplete="current-password"
                        aria-invalid={!!errors.rePassword}
                        className="pr-10"
                        {...register("rePassword")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          }))
                        }
                        aria-label={
                          showPassword.confirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showPassword.confirmPassword ? (
                          <EyeOffIcon className="size-4" />
                        ) : (
                          <EyeIcon className="size-4" />
                        )}
                      </Button>
                    </div>
                    <FieldError>{errors.rePassword?.message}</FieldError>
                  </Field>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Signing up…
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
