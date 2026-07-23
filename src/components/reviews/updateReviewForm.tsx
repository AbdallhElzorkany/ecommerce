"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { updateReview } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Review } from "@/types/product";
import { Save, X } from "lucide-react";
import { ReviewFormData, reviewSchema } from "@/components/reviews/addReviewForm";

export default function UpdateReviewForm({
  review,
  token,
  setIsEditing,
}: {
  review: Review;
  token?: string;
  setIsEditing: (isEditing: boolean) => void;
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
      rating: String(review.rating),
      review: review.review,
    },
    mode: "onChange",
  });
  const onSubmit = async (data: ReviewFormData) => {
    const res = await updateReview(review._id, review.product, data, token!);
    if (res?.message === "fail" || res?.statusMsg === "error") {
      const error = res.errors.msg ? res.errors.msg : res.message;
      toast.error(error);
      setError("root", { message: error });
    } else {
      toast.success("Review has been updated successfully");
      reset();
      setIsEditing(false);
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
    <Card>
      <CardHeader>
        <CardTitle>Update your review</CardTitle>
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
                  Updating... <Spinner />
                </span>
              ) : (
                <span className="flex flex-row items-center gap-2">
                  <Save className="size-4" />
                  Update
                </span>
              )}
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex flex-row items-center gap-2">
                <X className="size-4" />
                Cancel
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
