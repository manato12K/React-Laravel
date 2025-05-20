import MainLayout from "@/layouts/MainLayout";
import React, { FormEvent, useState, ChangeEvent } from 'react';
import {router} from '@inertiajs/react';

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
    const [values, setValues] = useState<ReviewValues>({
        user_id: 1,
        shop_id: shop.id,
        rating: 1,
        comment: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleRatingChange = (newRating: number) => {
        setValues({ ...values, rating: newRating });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                評価
                            </label>
                            <div className="flex gap-2">
                                {stars.map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className={`h-10 w-10 rounded-full ${
                                            values.rating >= star 
                                                ? 'bg-yellow-400 text-white' 
                                                : 'bg-gray-200'
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
                            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
                        >
                            投稿する
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default Create;