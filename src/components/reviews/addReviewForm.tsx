"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldContent, FieldLabel, FieldError } from "../ui/field";
import { createReview } from "@/lib/actions";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
import { RefreshCcw, Save } from "lucide-react";

export const reviewSchema = z.object({
  rating: z.string().regex(/^[1-5]$/, "Rating is required"),
  review: z
    .string()
    .min(1, "Review is required")
    .max(1000, "Review must be less than 1000 characters"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

export default function AddReviewForm({
  productId,
  token,
}: {
  productId: string;
  token?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "0",
      review: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data: ReviewFormData) => {
    const res = await createReview(productId, data, token!);
    if (res?.message === "fail" || res?.statusMsg === "error") {
      const error = res.errors.msg ? res.errors.msg : res.message;
      toast.error(error);
      setError("root", { message: error });
    } else {
      toast.success("Review has been added successfully");
      reset();
    }
  };
  if (!token) {
    return (
      <div className="p-6 rounded-2xl shadow-sm bg-background border border-border text-center">
        <h3 className="text-lg font-semibold mb-4">Login to review</h3>
        <p className="text-gray-600">
          Please login to leave a review for this product.
        </p>
      </div>
    );
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Write a review</CardTitle>
        <CardDescription>
          Share your experience with this product
        </CardDescription>
        {errors.root?.message && (
          <FieldError
            className={`text-center bg-destructive/10 border-destructive/50 text-destructive border  mx-auto p-2 rounded-2xl  w-full `}
          >
            {errors.root?.message}
          </FieldError>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel>
              Rating <span className="text-red-500">*</span>{" "}
              <FieldError>{errors.rating?.message}</FieldError>
            </FieldLabel>
            <FieldContent className="flex flex-row items-center gap-4">
              <Label
                htmlFor="1"
                className="cursor-pointer flex flex-col items-center gap-0"
              >
                1
                <Input
                  id="1"
                  type="radio"
                  {...register("rating")}
                  value={1}
                  className="cursor-pointer"
                />
              </Label>
              <Label
                htmlFor="2"
                className="cursor-pointer flex flex-col items-center gap-0"
              >
                2
                <Input
                  id="2"
                  type="radio"
                  {...register("rating")}
                  value={2}
                  className="cursor-pointer"
                />
              </Label>
              <Label
                htmlFor="3"
                className="cursor-pointer flex flex-col items-center gap-0"
              >
                3
                <Input
                  id="3"
                  type="radio"
                  {...register("rating")}
                  value={3}
                  className="cursor-pointer"
                />
              </Label>
              <Label
                htmlFor="4"
                className="cursor-pointer flex flex-col items-center gap-0"
              >
                4
                <Input
                  id="4"
                  type="radio"
                  {...register("rating")}
                  value={4}
                  className="cursor-pointer"
                />
              </Label>
              <Label
                htmlFor="5"
                className="cursor-pointer flex flex-col items-center gap-0"
              >
                5
                <Input
                  id="5"
                  type="radio"
                  {...register("rating")}
                  value={5}
                  className="cursor-pointer"
                />
              </Label>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>
              Review <span className="text-red-500">*</span>{" "}
              <FieldError>{errors.review?.message}</FieldError>
            </FieldLabel>
            <FieldContent>
              <Textarea
                placeholder="Share your experience with this product"
                rows={5}
                {...register("review")}
                maxLength={1000}
              />

              <p className="self-end text-xs text-muted-foreground">
                {watch("review").length}/1000 characters
              </p>
            </FieldContent>
          </Field>

          <div className="flex flex-row items-center gap-2 justify-between mt-2">
            <Button
              type="submit"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex flex-row items-center gap-2">
                  Saving... <Spinner />
                </span>
              ) : (
                <span className="flex flex-row items-center gap-2">
                  <Save className="size-4" />
                  Save
                </span>
              )}
            </Button>
            <Button
              type="button"
              onClick={() => reset()}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex flex-row items-center gap-2">
                <RefreshCcw className="size-4" />
                Reset
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
