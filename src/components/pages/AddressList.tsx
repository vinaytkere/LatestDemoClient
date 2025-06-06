import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppTable } from '../ui/AppTable';
import { AppButton } from '../ui/AppButton';
import type { Address } from '../../models/Address';
import { addressService } from '../../api/addressService';

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
    const navigate = useNavigate();

    const fetchAddresses = async (page: number, size: number) => {
        try {
            const res = await addressService.getAll(page + 1, size);
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
        <div className="pt-8 pb-10 overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 space-y-4 bg-white shadow rounded-md p-4">
                <div className="flex justify-end">
                    <AppButton label="Create" onClick={() => navigate('create')} />
                </div>
                <AppTable
                    data={addresses}
                    totalRecords={totalCount}
                    pageNumber={pageNumber}
                    rowsPerPage={pageSize}
                    onPaginationChange={handlePaginationChange}
                    columns={columns}
                    onEdit={(item) => navigate(`edit/${item.id}`)}
                    onDelete={async (item) => {
                        if (item.id) {
                            await addressService.remove(item.id);
                            fetchAddresses(pageNumber, pageSize);
                        }
                    }}
                />
            </div>
        </div>
    );
};