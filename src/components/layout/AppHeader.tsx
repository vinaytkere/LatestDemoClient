import React from 'react';
import { Link } from 'react-router-dom';

export const AppHeader: React.FC = () => {
    const token = localStorage.getItem('token');
    return (
        <header className="bg-gray-800 text-white">
            <nav className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-lg font-semibold">LatestDemo</Link>
                <div className="space-x-4">
                    {token ? (
                        <Link to="/">Addresses</Link>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
