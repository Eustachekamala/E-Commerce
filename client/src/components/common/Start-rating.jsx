import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StartRating({ rating, handleRatingChange }) {
    return (
        [1, 2, 3, 4, 5].map((star) => (
            <Button
                onClick={handleRatingChange ? () => handleRatingChange(star) : null}
                className={`p-1 rounded-full transition-colors ${
                    star <= rating ? "text-yellow-500" : "text-black"
                }`}
                key={star}
                variant="ghost"
                size="icon"
            >
                <StarIcon className={`${star <= rating ? "fill-yellow-500" : "fill-white"}`} />
            </Button>
        ))
    );
}

export default StartRating;