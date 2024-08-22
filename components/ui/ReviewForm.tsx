"use client";

import { useState, ChangeEvent } from "react";
import { Button, Input, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

interface ReviewFormProps {
  onSubmit: (data: { review: string; rating: number; email: string }) => Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value);
  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value));
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSubmit = async () => {
    await onSubmit({ review, rating, email });
    setIsOpen(false);
  };

  return (
    <>
      <Button size="lg" className="w-full" onClick={() => setIsOpen(true)}>
        Write a Review
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
              required
              mb={4}
            />
            <Textarea
              placeholder="Your Review"
              value={review}
              onChange={handleReviewChange}
              required
              mb={4}
            />
            <Input
              type="number"
              placeholder="Rating (0-5)"
              value={rating}
              onChange={handleRatingChange}
              min={0}
              max={5}
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
