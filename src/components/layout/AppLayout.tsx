import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <AppHeader />
            <main className="flex-grow p-4">
                <Outlet />
            </main>
        </div>
    );
};