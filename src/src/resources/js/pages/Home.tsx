import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import ReviewItem from '@/components/Molecules/ReviewItem';
import React, { FC, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';

interface Shop {
    id: number;
    name: string;
    search: string;
}

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

interface HomeProps {
    shops: Shop[];
    newReviews: Review[];
    search: string;
}

const Home: FC<HomeProps> = ({ shops, newReviews, search }) => {
    const [searchTerm, setSearchTerm] = useState(search);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get('/', { search: searchTerm }, { preserveState: true });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const itemsPerPage = 4;
    const [itemsOffset, setItemsOffset] = useState(0);
    const endOffset = itemsOffset + itemsPerPage;
    const currentShops = shops.slice(itemsOffset, endOffset);
    const pageCount = Math.ceil(shops.length / itemsPerPage);

    const handlePageClick = (e: { selected: number }) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        setItemsOffset(newOffset);
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-12 text-center text-5xl font-bold text-gray-900 drop-shadow-sm">caffee shop</h1>

                    <div className="mb-8 flex justify-center">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="ショップを検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-full border-2 border-amber-200 bg-white px-6 py-3 text-lg shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:outline-none"
                            />
                            <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-gray-400">🔍</span>
                        </div>
                    </div>

                    <div className="mb-16">
                        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {currentShops.map((shop) => (
                                <li key={shop.id} className="group">
                                    <Link href={route('shop.detail', { id: shop.id })}>
                                        <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                                            <div className="relative h-48 w-full bg-gray-200">
                                                <img
                                                    src="https://placehold.co/400x300?text=Shop+Image"
                                                    alt={`${shop.name}の写真`}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-800">{shop.name}</h3>
                                                <div className="mt-2 flex items-center text-amber-500">
                                                    <span className="mr-1">
                                                        総合評価：
                                                        {shop.reviews?.length > 0
                                                            ? (
                                                                  shop.reviews.reduce((sum, review) => sum + review.rating, 0) / shop.reviews.length
                                                              ).toFixed(1)
                                                            : 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {pageCount > 1 && (
                        <ReactPaginate
                            className="mb-16 flex justify-center"
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="pagination flex gap-3"
                            pageClassName="page-item"
                            pageLinkClassName="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-200 bg-white text-sm font-medium text-gray-700 transition-all duration-200 hover:border-amber-400 hover:bg-amber-50"
                            activeClassName="active"
                            activeLinkClassName="!bg-amber-400 !border-amber-400 !text-white hover:!bg-amber-500"
                            previousLabel="←"
                            nextLabel="→"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            previousLinkClassName="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-200 bg-white text-sm font-medium text-gray-700 transition-all duration-200 hover:border-amber-400 hover:bg-amber-50"
                            nextLinkClassName="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-200 bg-white text-sm font-medium text-gray-700 transition-all duration-200 hover:border-amber-400 hover:bg-amber-50"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-200 bg-white text-sm font-medium text-gray-700"
                        />
                    )}

                    <div className="rounded-3xl bg-white p-8 shadow-lg">
                        <h2 className="mb-8 text-3xl font-bold text-gray-900">最新のレビュー</h2>
                        <ul className="space-y-6">
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