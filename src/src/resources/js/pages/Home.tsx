import React, { FC } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import ReviewItem from '@/components/Molecules/ReviewItem';

interface Shop {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Reviews {
  id: number;
  comment: string;
  rating: number;
  user: User; // この行を追加
}

interface HomeProps {
  shops: Shop[];
  newReviews: Reviews[];
}

const Home: FC<HomeProps> = ({ shops, newReviews }) => {
  return (
      <MainLayout>
          <div className="mb-6 rounded-lg bg-amber-50 p-6 shadow-md">
              <div className="mx-auto max-w-6xl p-6">
                  <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">ショップ一覧ページ</h1>

                  <div className="mb-12">
                      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {shops.map((shop) => (
                              <li key={shop.id} className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
                                  <Link href={route('shop.detail', { id: shop.id })}>
                                      <div className="flex items-center gap-4">
                                          <div className="relative h-24 w-24">
                                              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-200">
                                                  <span className="text-sm text-gray-400">写真</span>
                                              </div>
                                              <img
                                                  src="https://placehold.co/100x100?text=No+Image"
                                                  alt={`${shop.name}の写真`}
                                                  className="absolute inset-0 h-full w-full rounded-lg object-cover"
                                              />
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-700">{shop.name}</h3>
                                      </div>
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-8">
                      <h2 className="mb-6 text-2xl font-bold text-gray-800">新着レビュー</h2>
                      <ul className="space-y-4">
                          {newReviews.map((review) => (
                              <ReviewItem key={review.id} review={review} />
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
      </MainLayout>
  );
};

export default Home;