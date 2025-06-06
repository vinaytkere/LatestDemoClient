import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppInputText } from '../ui/AppInputText';
import { AppButton } from '../ui/AppButton';
import authService from '../../api/authService';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.register({ username, password });
            navigate('/login');
        } catch {
            setError('Failed to register');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3">
                <h2 className="text-xl font-semibold text-center">Register</h2>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <AppInputText id="username" label="Username" value={username} onChange={setUsername} required />
                <AppInputText id="password" label="Password" type="password" value={password} onChange={setPassword} required />
                <AppButton label="Register" type="submit" className="w-full" />
            </form>
        </div>
    );
};
