import apiClient from './apiClient';

export interface ApiService<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<void>;
    remove(id: string): Promise<void>;
}

export function createApiService<T>(endpoint: string): ApiService<T> {
    return {
        getAll: async (): Promise<T[]> => {
            const response = await apiClient.get<T[]>(`/${endpoint}`);
            return response.data;
        },

        getById: async (id: string) => {
            const response = await apiClient.get<T>(`/${endpoint}/${id}`);
            return response.data;
        },

        create: async (data: Partial<T>) => {
            const response = await apiClient.post<T>(`/${endpoint}`, data);
            return response.data;
        },

        update: async (id: string, data: Partial<T>) => {
            await apiClient.put(`/${endpoint}/${id}`, data);
        },

        remove: async (id: string) => {
            await apiClient.delete(`/${endpoint}/${id}`);
        },
    };
}