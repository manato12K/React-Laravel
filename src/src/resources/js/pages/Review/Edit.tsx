import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { router } from "@inertiajs/react";

interface ReviewProps {
  review: {
    id: number;
    rating: number;
    comment: string;
    shop_id: number;
  };
}

const Edit = ({ review }: ReviewProps) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setContent] = useState(review.comment);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/review/${review.id}`, {
        rating,
        comment,
    });
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">レビュー編集</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              評価
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`h-10 w-10 rounded-full ${
                    rating >= star ? 'bg-yellow-400 text-white' : 'bg-gray-200'
                  } transition-colors duration-200`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              レビュー内容
            </label>
            <textarea
              value={comment}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-2 border rounded-md"
              placeholder="レビューを入力してください"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Edit;
