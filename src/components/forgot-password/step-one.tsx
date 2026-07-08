import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleAlertIcon } from "lucide-react";
import { forgotPassword } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export default function StepOne({
  setStep,
  setEmail,
}: {
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
}) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const res = await forgotPassword(data);
    if (res?.statusMsg !== "success") {
      setError("root", {
        message: res.message,
      });
      return;
    }
    setEmail(data.email);
    setStep(2);
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
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="your email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError>{errors.email?.message}</FieldError>
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
                Sending…
              </>
            ) : (
              "Send Reset Password Code"
            )}
          </Button>
        </FieldGroup>
      </form>
    </>
  );
}
