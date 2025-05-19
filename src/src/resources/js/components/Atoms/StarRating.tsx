import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span key={index} className='text-yellow-400'>{index < rating ? '★' : '☆'}</span>
      ))}
    </div>
  );
};

export default StarRating;