import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, size = 14, showNumber = true, reviewsCount }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-forest-700">
      <div className="flex items-center text-gold-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={star <= Math.round(rating) ? "fill-gold-500 text-gold-500" : "text-sand-300"}
          />
        ))}
      </div>
      {showNumber && <span className="font-semibold text-forest-900">{rating.toFixed(1)}</span>}
      {reviewsCount !== undefined && (
        <span className="text-forest-700/60">({reviewsCount})</span>
      )}
    </div>
  );
};
