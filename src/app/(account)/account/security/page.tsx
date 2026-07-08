"use client";
import { signOut, useSession } from "next-auth/react";
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
import { resetLoggedInPassword } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

const resetLoggedInPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type ResetLoggedInPasswordFormData = z.infer<
  typeof resetLoggedInPasswordSchema
>;

export default function ResetLoggedInPasswordPage() {
  const { data: session } = useSession();

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
  } = useForm<ResetLoggedInPasswordFormData>({
    resolver: zodResolver(resetLoggedInPasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ResetLoggedInPasswordFormData) => {
    const res = await resetLoggedInPassword(data, session?.accessToken as string);
    if (res?.message !== "success") {
      setError("root", {
        message: res?.errors?.msg || res?.message,
      });
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      signOut({
        callbackUrl: "/signin",
      });
    }, 3000);
  };

  return (
    <div className="flex h-full items-center justify-center px-4">
      <Card className="w-full max-w-md">
        {isSuccess ? (
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
                  You will be logged out in 3 seconds. You can now sign in
                  with your new password.
                </p>
              </div>
            </div>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight text-center">
                Reset Password
              </CardTitle>
              <CardDescription className="text-center">
                Enter your current password and new password to reset your
                password
              </CardDescription>
            </CardHeader>

            <CardContent>
              {errors.root && (
                <div className="mb-2 flex items-center  justify-center gap-1 rounded-2xl  border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <CircleAlertIcon className="size-4 shrink-0" />
                  <span>{errors.root.message}</span>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* Name */}
                  <Field data-invalid={!!errors.currentPassword}>
                    <FieldLabel htmlFor="currentPassword">
                      Current Password
                    </FieldLabel>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                      aria-invalid={!!errors.currentPassword}
                      {...register("currentPassword")}
                    />
                    <FieldError>{errors.currentPassword?.message}</FieldError>
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
                        Saving…
                      </>
                    ) : (
                      "Save New Password"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
