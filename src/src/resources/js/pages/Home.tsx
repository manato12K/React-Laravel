import React, { FC } from 'react';

interface Shop {
  id: number;
  name: string;
}

interface Review {
  id: number;
  comment: string;
}

interface HomeProps {
  shops: Shop[];
  newReviews: Review[];
}

const Home: FC<HomeProps> = ({ shops, newReviews }) => {
  return (
    <>
      <h1>ショップ一覧ページ</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>{shop.name}</li>
        ))}
      </ul>
      <h2>新着レビュー</h2>
      <ul>
        {newReviews.map((review) => (
          <li key={review.id}>{review.comment}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
