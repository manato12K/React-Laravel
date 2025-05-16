import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                My App
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex">
              <Link
                to="/sample"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sample
              </Link>
              <Link
                to="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                to="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="ml-3 relative">
              <button
                type="button"
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
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
