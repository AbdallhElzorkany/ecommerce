"use client";
import { Card } from "@/components/ui/card";
import { Star, Edit2 } from "lucide-react";
import { Review } from "@/types/product";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import {  useMemo, useState } from "react";
import UpdateReviewForm from "@/components/reviews/updateReviewForm";

import DeleteReviewForm from "@/components/reviews/deleteReviewForm";
interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
export default function ReviewCard({
  review,
  token,
}: {
  review: Review;
  token?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const decodedToken = useMemo(
    () => (token ? jwtDecode<DecodedToken>(token) : null),
    [token],
  );

  return (
    <Card key={review._id} className="p-6 rounded-2xl shadow-sm">
      {isEditing ? (
        <UpdateReviewForm
          review={review}
          token={token}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">
                {(review.user?.name || "A")[0].toUpperCase()}
              </div>
              <div>
                <span className="font-semibold block">
                  {review.user?.name || "Anonymous User"}
                </span>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              {decodedToken?.id === review.user?._id && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    title="Edit review"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="size-4" />
                  </Button>
                  <DeleteReviewForm review={review} token={token} />
                </div>
              )}
              <p className="text-xs text-primary text-right w-fit">
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <p className="leading-relaxed ml-14">{review.review}</p>
        </>
      )}
    </Card>
  );
}
