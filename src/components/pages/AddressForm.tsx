import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Address } from '../../models/Address';
import { AppForm, type FormField } from '../ui/AppForm';
import { addressService, type AddressInput } from '../../api/addressService';

export const AddressForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [model, setModel] = useState<AddressInput>({
        country: '',
        state: '',
        city: '',
        pinCode: '',
        landMark: '',
    });

    useEffect(() => {
        if (isEdit && id) {
            addressService.getById(id).then((data: Address) => {
                setModel({
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    pinCode: data.pinCode,
                    landMark: data.landMark ?? '',
                });
            });
        }
    }, [id, isEdit]);

    const fields: FormField<AddressInput>[] = [
        { key: 'country', label: 'Country', required: true },
        { key: 'state', label: 'State', required: true },
        { key: 'city', label: 'City', required: true },
        { key: 'pinCode', label: 'Pin Code', required: true },
        { key: 'landMark', label: 'Landmark' },
    ];

    const handleChange = (key: keyof AddressInput, value: string | null) => {
        setModel(prev => ({ ...prev, [key]: value ?? '' }));
    };

    const handleSubmit = async () => {
        try {
            if (isEdit && id) {
                await addressService.update(id, model);
            } else {
                await addressService.create(model);
            }
            navigate('/');
        } catch (err) {
            console.error('Failed to save address', err);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow rounded-md p-4 mt-8">
            <AppForm model={model} fields={fields} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
};
