import MainLayout from '@/layouts/MainLayout';
import React, { useState } from 'react';
import StarRating from '@/components/Atoms/StarRating';
import ReviewItem from '@/components/Molecules/ReviewItem';
import { Link, usePage } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';

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
    shop_images?: Array<{
        file_path: string;
    }>;
}

interface Props {
    shop: Shop;
}

const Detail: React.FC<Props> = ({ shop }) => {
    const { auth } = usePage().props;

    const averageRating = shop.reviews.length > 0
        ? shop.reviews.reduce((acc, review) => acc + review.rating, 0) / shop.reviews.length
        : 0;
    
    const itemsPerPage = 5;
    const [itemsOffset, setItemsOffset] = useState(0);
    const endOffset = itemsOffset + itemsPerPage;
    const currentReviews = shop.reviews.slice(itemsOffset, endOffset);
    const pageCount = Math.ceil(shop.reviews.length / itemsPerPage);
    
    const handlePageClick = (e: { selected: number }) => {
        const newOffset = (e.selected * itemsPerPage) % shop.reviews.length;
        setItemsOffset(newOffset);
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-4xl p-8">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">店舗詳細</h1>
                <div className="transform transition-transform duration-300 hover:scale-105">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-lg hover:shadow-xl">
                        <div className="p-8">
                            {/* ショップ名と写真 */}
                            <div className="rounded-lg bg-gray-50 p-6">
                                <p className="mb-6 flex items-center justify-center text-xl text-gray-700">
                                    <span className="mr-3 font-medium">店舗名：</span>
                                    <span className="text-gray-900">{shop.name}</span>
                                </p>
                                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-200">
                                    {shop.shop_images && shop.shop_images.length > 0 ? (
                                        <img
                                            src={`${import.meta.env.VITE_APP_URL}/${shop.shop_images[0].file_path}`}
                                            alt={`${shop.name}の写真 1`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src="/storage/images/noimage.png"
                                            alt={`${shop.name}の写真`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 店舗説明 */}
                            <div className="mt-8 rounded-lg bg-gray-50 p-6">
                                <h2 className="mb-4 text-lg font-semibold text-gray-800">店舗説明</h2>
                                <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{shop.description}</p>
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
                            <div className="mt-8 flex justify-left">
                                {auth.user && auth.user.id !== 0 ? (
                                    <>
                                        <Link
                                            href={route('review.create', { id: shop.id })}
                                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            レビューを作成
                                        </Link>
                                        <Link
                                            href={route('shop.delete', { id: shop.id })}
                                            method="delete"
                                            as="button"
                                            className="ml-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            onBefore={() => confirm('本当に削除しますか？')}
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            削除
                                        </Link>
                                    </>
                                ) : (
                                    <div>作成するにはログインしてください</div>
                                )}
                            </div>

                            {shop.reviews.length === 0 ? (
                                <div className="mt-8 rounded-lg bg-gray-50 p-6">
                                    <p className="text-gray-700">レビューがありません。</p>
                                </div>
                            ) : (
                                <div className="mt-8 rounded-lg bg-gray-50 p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg font-semibold text-gray-800">レビュー</h2>
                                            <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-600">{shop.reviews.length}件</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-700">総合評価：</span>
                                            <StarRating rating={Math.round(averageRating)} />
                                            <span className="font-medium">{averageRating.toFixed(1)}</span>
                                            <span className="ml-1 text-sm text-gray-500">/5.0</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <ul className="space-y-4">
                                            {currentReviews.map((review) => (
                                                <Link
                                                    href={route('review.edit', { id: review.id })}
                                                    className="group"
                                                    key={review.id}
                                                >
                                                    <ReviewItem review={review} />
                                                </Link>
                                            ))}
                                        </ul>
                                        
                                        {pageCount > 1 && (
                                            <ReactPaginate
                                                className="mt-6 flex justify-center"
                                                pageCount={pageCount}
                                                onPageChange={handlePageClick}
                                                containerClassName="pagination flex gap-2"
                                                pageClassName="page-item inline-block"
                                                pageLinkClassName="page-link inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                activeClassName="active"
                                                activeLinkClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                                previousLabel="＜"
                                                nextLabel="＞"
                                                previousClassName="page-item inline-block"
                                                nextClassName="page-item inline-block"
                                                previousLinkClassName="page-link inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                nextLinkClassName="page-link inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                disabledClassName="disabled opacity-50 cursor-not-allowed"
                                                breakLabel="..."
                                                breakClassName="page-item inline-block"
                                                breakLinkClassName="page-link inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Detail;
