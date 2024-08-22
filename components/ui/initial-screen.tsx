"use client";

import { useState, useEffect } from "react";
import { ReviewForm } from "./ReviewForm"; // Assuming the ReviewForm is in the same folder
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: number;
  user: string;
  rating: number;
  review: string;
}

export function InitialScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/get-reviews"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async ({ review, rating, email }: { review: string; rating: number; email: string }) => {
    try {
      const response = await fetch("/api/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review, rating, email }),
      });

      if (!response.ok) {
        throw new Error("Error submitting review");
      }

      const data = await response.json();

      if (data.success) {
        setReviews((prevReviews) => [
          ...prevReviews,
          { id: data.reviewId, user: data.userName, rating, review },
        ]);
      } else {
        alert(data.message || "You need to make a purchase first.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting your review. Please try again.");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">Luxurious Human Hair Extensions</h1>
          <div>
            <p>
              Experience the ultimate in hair luxury with our premium human hair extensions...
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <div className="text-4xl font-bold">$199</div>
          </div>
          <div className="flex gap-4">
            <Button size="lg">Add to Cart</Button>
            <Button size="lg" variant="secondary">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-8">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <div className="text-lg font-semibold">4.2 out of 5</div>
            <div className="text-muted-foreground">(142 reviews)</div>
          </div>
          {loading ? (
            <div>Loading reviews...</div>
          ) : (
            <div className="grid gap-4">
              {reviews.map((review) => (
                <div key={review.id}>
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{review.user}</div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, index) => (
                            <StarIcon
                              key={index}
                              className={`w-4 h-4 ${index < review.rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm leading-loose text-muted-foreground">
                        <p>{review.review}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
