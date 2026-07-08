import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleAlertIcon } from "lucide-react";
import { verifyResetCode } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup } from "../ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

const verifyResetCodeSchema = z.object({
  resetCode: z.string().regex(/^[0-9]{6}$/, "Reset code must be 6 digits"),
});

export type VerifyResetCodeFormData = z.infer<typeof verifyResetCodeSchema>;

export default function StepTwo({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
    setError,
  } = useForm<VerifyResetCodeFormData>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: VerifyResetCodeFormData) => {
    const res = await verifyResetCode(data);
    if (res?.status !== "Success") {
      setError("root", {
        message: res.message,
      });
      return;
    }

    setStep(3);
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
          <Field  data-invalid={!!errors.resetCode} >
            <Controller 
              control={control}
              name="resetCode"
              render={({ field }) => (
                <InputOTP containerClassName="w-full justify-center" maxLength={6} id="resetCode" {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <FieldError className="text-center">{errors.resetCode?.message}</FieldError>
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
