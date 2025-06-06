import apiClient from './apiClient';
import type { Address } from '../models/Address';
import type { PaginatedResponse } from '../models/PaginatedResponse';

export interface AddressInput {
    country: string;
    state: string;
    city: string;
    pinCode: string;
    landMark?: string;
}

const endpoint = 'Address';

export const addressService = {
    getAll: async (
        pageNumber = 1,
        pageSize = 5,
        filters?: { city?: string; state?: string }
    ): Promise<PaginatedResponse<Address>> => {
        const params = { pageNumber, pageSize, ...filters };
        const response = await apiClient.get<PaginatedResponse<Address>>(`/${endpoint}`, { params });
        return response.data;
    },

    getById: async (id: string): Promise<Address> => {
        const response = await apiClient.get<Address>(`/${endpoint}/${id}`);
        return response.data;
    },

    create: async (data: AddressInput): Promise<Address> => {
        const response = await apiClient.post<Address>(`/${endpoint}`, data);
        return response.data;
    },

    update: async (id: string, data: AddressInput): Promise<void> => {
        await apiClient.put(`/${endpoint}/${id}`, data);
    },

    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/${endpoint}/${id}`);
    },
};
