import apiClient from './apiClient';

export interface LoginInput {
    username: string;
    password: string;
}

export interface RegisterInput {
    username: string;
    password: string;
}

const authService = {
    login: async (data: LoginInput): Promise<string> => {
        const res = await apiClient.post<{ token: string }>('/auth/login', data);
        return res.data.token;
    },
    register: async (data: RegisterInput): Promise<void> => {
        await apiClient.post('/auth/register', data);
    }
};

export default authService;
