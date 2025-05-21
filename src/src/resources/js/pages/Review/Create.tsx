import MainLayout from "@/layouts/MainLayout";
import React, { FormEvent, useState, ChangeEvent } from 'react';
import {router, usePage } from '@inertiajs/react';

interface Shop {
    id: number;
    name: string;
}

interface Props {
    shop: Shop;
}

interface ReviewValues {
    user_id: number;
    shop_id: number;
    rating: number;
    comment: string;
}

const stars = [1, 2, 3, 4, 5];

const Create: React.FC<Props> = ({ shop }) => {

    const { auth } = usePage().props

    const [values, setValues] = useState<ReviewValues>({
        user_id: auth.user.id,
        shop_id: shop.id,
        rating: 1,
        comment: '',
    });

    const [isloading, setIsloading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleRatingChange = (newRating: number) => {
        setValues({ ...values, rating: newRating });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = () => {
        setIsloading(true);
        setShowModal(false);
        router.post(route('review.store'), values);
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-8 text-3xl font-bold text-gray-800">レビュー投稿</h1>

                <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-2 text-xl font-semibold text-gray-700">{shop.name}</h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">評価</label>
                            <div className="flex gap-2">
                                {stars.map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className={`h-10 w-10 rounded-full ${
                                            values.rating >= star ? 'bg-yellow-400 text-white' : 'bg-gray-200'
                                        } transition-colors duration-200`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="comment">
                                コメント
                            </label>
                            <textarea
                                className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                name="comment"
                                id="comment"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!values.comment || values.rating === 0}
                            className={`w-full rounded-md px-4 py-2 font-medium text-white transition duration-200 ${
                                !values.comment || values.rating === 0 
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {!values.comment || values.rating === 0 ? (
                                'コメントと評価を入力してください'
                            ) : (
                                isloading ? '投稿中...' : '投稿する'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-medium">レビューを投稿しますか？</h3>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                投稿する
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

export default Create;