import MainLayout from '@/layouts/MainLayout';
import React from 'react';

interface ShopDetailProps {
    shop: {
        name: string;
        description: string;
        location: string;
    }
}

const Detail: React.FC<ShopDetailProps> = ({ shop }) => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    ショップ詳細
                </h1>
                <div className="transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200">
                        <div className="p-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-xl text-gray-700 flex items-center justify-center mb-6">
                                    <span className="font-medium mr-3">ショップ名：</span>
                                    <span className="text-gray-900">{shop.name}</span>
                                </p>
                                <div className="aspect-[16/9] relative bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/1600x900"
                                        alt={`${shop.name}の写真`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">店舗説明</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {shop.description}
                                </p>
                            </div>
                            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">所在地</h2>
                                <p className="text-gray-700 leading-relaxed flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {shop.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Detail;
