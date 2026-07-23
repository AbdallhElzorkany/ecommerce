import { Review } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
import { deleteReview } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/ui/spinner";
export default function DeleteReviewForm({
  review,
  token,
}: {
  review: Review;
  token?: string;
}) {
  const [clearConfirm, setClearConfirm] = useState(false);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleDelete = async () => {
    if (!clearConfirm) {
      setClearConfirm(true);
      setTimeout(() => setClearConfirm(false), 3000);
      return;
    }
    const res = await deleteReview(review._id, review.product, token!);
    if (res?.message) {
      toast.error(res.message);
    } else {
      toast.success("Review has been deleted successfully");
    }
    setClearConfirm(false);
  };

  return (
    <form onSubmit={handleSubmit(handleDelete)}>
      <Button
        disabled={isSubmitting}
        type="submit"
        variant={clearConfirm ? "destructive" : "outline"}
        size="sm"
        className="gap-2 cursor-pointer transition-all"
        title={clearConfirm ? "Are you sure?" : "Delete review"}
      >
        {isSubmitting ? (
          <Spinner className="size-4" />
        ) : clearConfirm ? (
          <span className="flex gap-2 items-center">
            <Trash2 className="size-4" /> ?
          </span>
        ) : (
          <Trash className="size-4" />
        )}
      </Button>
    </form>
  );
}
