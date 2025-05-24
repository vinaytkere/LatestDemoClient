import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export const AppLayout = () => {
    return (
        <div>
            <AppHeader />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
};