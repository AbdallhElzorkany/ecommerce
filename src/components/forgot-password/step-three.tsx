import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleAlertIcon } from "lucide-react";
import { resetPassword } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

const resetPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
  newPassword: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function StepThree({
  setStep,
  email,
}: {
  setStep: (step: number) => void;
  email: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<resetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: resetPasswordFormData) => {
    const res = await resetPassword(data);
    console.log(res);
    if (res?.statusMsg === "fail") {
      setError("root", {
        message: res.message,
      });
      return;
    }

    setStep(4);
  };
  return (
    <>
      {errors.root && (
        <div className="mb-2 flex items-center justify-center gap-1 rounded-2xl  border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <CircleAlertIcon className="size-4 shrink-0" />
          <span>{errors.root.message}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Email */}
          <Field data-invalid={!!errors.newPassword}>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="your password"
              autoComplete="password"
              aria-invalid={!!errors.newPassword}
              {...register("newPassword")}
            />
            <FieldError>{errors.newPassword?.message}</FieldError>
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
                Saving...
              </>
            ) : (
              "Save New Password"
            )}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
}
