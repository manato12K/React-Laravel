import React, { FC } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

interface Shop {
  id: number;
  name: string;
}

interface User {
  name: string;
}

interface Review {
  id: number;
  comment: string;
  rating: number;
  user: User;
}

interface HomeProps {
  shops: Shop[];
  newReviews: Review[];
}

const Home: FC<HomeProps> = ({ shops, newReviews }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="text-xl">
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <MainLayout>
      <div className='bg-amber-50 p-6 rounded-lg shadow-md mb-6'>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            ショップ一覧ページ
          </h1>

          <div className="mb-12">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <li key={shop.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <Link href={route('shop.detail', { id: shop.id })}>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">写真</span>
                        </div>
                        <img
                          src="https://placehold.co/100x100?text=No+Image"
                          alt={`${shop.name}の写真`}
                          className="absolute inset-0 w-full h-full rounded-lg object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700">{shop.name}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">新着レビュー</h2>
            <ul className="space-y-4">
              {newReviews.map((review) => (
                <li
                  key={review.id}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{review.user.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;