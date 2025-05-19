import React from 'react';
import StarRating from '../Atoms/StarRating';
import UserName from '../Atoms/UserName';

interface User {
  id: number;
  name: string;
}

interface Review {
  id: number;
  comment: string;
  rating: number;
  user: User;
}


const ReviewItem = ({ review }: { review: Review }) => {
    return (
        <li key={review.id} className="rounded-lg bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <UserName name={review.user.name} />
            <div className="mb-2 flex items-center">
                <div className="text-yellow-400">
                    <StarRating rating={review.rating} />
                </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
        </li>
    );
};

export default ReviewItem;