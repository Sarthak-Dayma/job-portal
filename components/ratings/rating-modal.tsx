"use client"

import { useState } from "react"
import { Star, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface RatingModalProps {
  targetName: string
  targetType: "worker" | "employer"
  jobTitle: string
  onSubmit: (rating: number, review: string) => void
  onClose: () => void
}

export default function RatingModal({
  targetName,
  targetType,
  jobTitle,
  onSubmit,
  onClose,
}: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating")
      return
    }
    onSubmit(rating, review)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">
            Rate {targetType === "worker" ? "Worker" : "Employer"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Job completed</p>
            <p className="font-semibold text-foreground">{jobTitle}</p>
            <p className="text-sm text-muted-foreground">{targetName}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">
              How was your experience?
            </p>
            <div className="flex items-center gap-2 justify-center">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {rating === 0 && "Click to rate"}
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Write a review (optional)
            </label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Rating
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
