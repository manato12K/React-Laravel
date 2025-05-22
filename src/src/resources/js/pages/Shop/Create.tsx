import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { router, useForm} from '@inertiajs/react';

function Create() {
    const { data, setData, errors, processing } = useForm({
        name: '',
        location: '',
        description: '',
        images: [] as File[],
    });

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('description', data.description);
        
        if (data.images) {
            Array.from(data.images).forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }

        router.post(route('shop.store'), formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('images', files);

            // Generate preview URLs
            const urls = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => {
                // Revoke old URLs to prevent memory leaks
                prev.forEach(url => URL.revokeObjectURL(url));
                return urls;
            });
        }
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">新規ショップ投稿</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                ショップ名
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.name && <div className="mt-2 text-sm text-red-600">{errors.name}</div>}
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                場所
                            </label>
                            {/* ここは時期にAPIをとってきて名前を検索したらその住所が自動で入力されるようにしたい */}
                            <input
                                type="text"
                                name="location"
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.location && <div className="mt-2 text-sm text-red-600">{errors.location}</div>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                説明
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.description && <div className="mt-2 text-sm text-red-600">{errors.description}</div>}
                        </div>

                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                                画像
                            </label>
                            <input 
                                type="file" 
                                id="images" 
                                name="images" 
                                multiple 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-medium
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                            />
                            {errors.images && <div className="mt-2 text-sm text-red-600">{errors.images}</div>}
                            
                            {previewUrls.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="relative aspect-square">
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="h-full w-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? '送信中...' : '投稿'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default Create;