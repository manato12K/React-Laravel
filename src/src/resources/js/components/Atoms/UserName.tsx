import React from 'react';

interface UserNameProps {
    name: string;
}

const UserName: React.FC<UserNameProps> = ({ name }) => {
    return (
        <div className="flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        </div>
    );
}

export default UserName;