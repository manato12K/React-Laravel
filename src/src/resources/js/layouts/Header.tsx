import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Auth {
    user: {
        id: number;
        name: string;
    }
}

interface PageProps {
    auth: Auth;
}

const Header: React.FC = () => {
    const { auth } = usePage<PageProps>().props;

    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <nav className="flex">
                        <div className="flex flex-shrink-0 items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">
                                        Logout
                                    </Link>
                                    <Link
                                        href={route('shop.create')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        ShopCreate
                                    </Link>
                                    <Link href={route('home')} className='="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    '>一覧に戻る</Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route('home')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Home
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <p className="text-sm font-semibold text-gray-700 dark:text-[#EDEDEC]">User: {auth.user.name}</p>
                        ) : (
                            <p className="text-sm font-semibold text-gray-700 dark:text-[#EDEDEC]">Please login</p>
                        )}
                        <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                            aria-label="View notifications"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>

                        <div className="relative">
                            <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none" aria-label="Open user menu">
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="User avatar"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
