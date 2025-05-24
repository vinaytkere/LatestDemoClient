import React, { useEffect, useState } from 'react';
import { AppTable } from '../ui/AppTable';
import type { Address } from '../../models/Address';
import type { PaginatedResponse } from '../../models/PaginatedResponse';
import { createApiService } from '../../api/apiService';

const columns: { field: keyof Address; header: string }[] = [
    { field: 'country', header: 'Country' },
    { field: 'state', header: 'State' },
    { field: 'city', header: 'City' },
    { field: 'pinCode', header: 'Pin Code' },
];

export const AddressList: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const fetchAddresses = async (page: number, size: number) => {
        try {
            const api = createApiService<PaginatedResponse<Address>>(
                `Address?pageNumber=${page + 1}&pageSize=${size}`
            );
            const res = await api.getAll();
            setAddresses(res.items);
            setTotalCount(res.totalCount);
        } catch (error) {
            console.error('Failed to fetch addresses', error);
        }
    };

    useEffect(() => {
        fetchAddresses(pageNumber, pageSize);
    }, [pageNumber, pageSize]);

    const handlePaginationChange = ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
        setPageNumber(pageNumber);
        setPageSize(pageSize);
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-20 overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">
                <AppTable
                    data={addresses}
                    totalRecords={totalCount}
                    pageNumber={pageNumber}
                    rowsPerPage={pageSize}
                    onPaginationChange={handlePaginationChange}
                    columns={columns}
                    onEdit={(item) => console.log('Edit', item)}
                    onDelete={(item) => console.log('Delete', item)}
                />
            </div>
        </div>
    );
};