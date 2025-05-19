import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import StarRating from '@/components/Atoms/StarRating';

interface Review {
  id: number;
  comment: string;
  rating: number;
  user: User;
  created_at: string;
}

interface User {
  id: number;
  name: string;
}

interface Shop {
  id: number;
  name: string;
  description: string;
  location: string;
  reviews: Review[];
}

interface Props {
  shop: Shop;
}
// ... existing code ...

const Detail: React.FC<Props> = ({ shop }) => {
  const averageRating = shop.reviews.length > 0
    ? shop.reviews.reduce((acc, review) => acc + review.rating, 0) / shop.reviews.length
    : 0;

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">ショップ詳細</h1>
        <div className="transform transition-transform duration-300 hover:scale-105">
          <div className="rounded-lg border border-gray-200 bg-white shadow-lg hover:shadow-xl">
            <div className="p-8">
              {/* ショップ名と写真 */}
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-6 flex items-center justify-center text-xl text-gray-700">
                  <span className="mr-3 font-medium">ショップ名：</span>
                  <span className="text-gray-900">{shop.name}</span>
                </p>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src="https://placehold.co/1600x900?text=Shop+Image"
                    alt={`${shop.name}の写真`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* 店舗説明 */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">店舗説明</h2>
                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{shop.description}</p>
              </div>

              {/* 所在地 */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">所在地</h2>
                <p className="flex items-center leading-relaxed text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {shop.location}
                </p>
              </div>

              {/* レビュー */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">レビュー</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">総合評価：</span>
                    <StarRating rating={Math.round(averageRating)} />
                    <span className="font-medium">{averageRating.toFixed(1)}</span>
                    <span className="ml-1 text-sm text-gray-500">/5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {shop.reviews.length === 0 ? (
                    <p className="py-4 text-center text-gray-500">レビューはまだありません。</p>
                  ) : (
                    shop.reviews.map((review) => (
                      <div key={review.id} className="rounded bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                              <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-800">{review.user.name}</span>
                          </div>
                          <div className="flex items-center text-yellow-400">
                            <StarRating rating={review.rating} />
                            <span className="ml-1 text-gray-700 font-medium">{review.rating}.0</span>
                            <span className="text-gray-500 ml-1 text-sm">/5.0</span>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Detail;