import { Dropdown } from 'primereact/dropdown';
import React from 'react';

interface AppDropdownProps<T> {
    id: string;
    label: string;
    value: T;
    options: { label: string; value: T }[];
    onChange: (value: T) => void;
    required?: boolean;
}

export function AppDropdown<T>({
    id,
    label,
    value,
    options,
    onChange,
    required
}: AppDropdownProps<T>) {
    return (
        <div className="p-field">
            <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
            <Dropdown
                id={id}
                value={value}
                options={options}
                onChange={(e) => onChange(e.value as T)}
                className="w-full"
            />
        </div>
    );
}
