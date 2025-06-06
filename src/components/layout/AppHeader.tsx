import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AppHeader: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-10">
            <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-lg font-semibold" onClick={() => setMenuOpen(false)}>LatestDemo</Link>
                <button className="md:hidden" onClick={() => setMenuOpen(o => !o)}>
                    <i className="pi pi-bars" />
                </button>
                <div className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center space-x-4`}> 
                    {token ? (
                        <>
                            <Link to="/addresses" className="block" onClick={() => setMenuOpen(false)}>Addresses</Link>
                            <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="block">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:underline">Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="block hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
