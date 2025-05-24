import { Dropdown } from 'primereact/dropdown';
import React from 'react';

interface AppDropdownProps {
    id: string;
    label: string;
    value: any;
    options: { label: string; value: any }[];
    onChange: (value: any) => void;
    required?: boolean;
}

export const AppDropdown: React.FC<AppDropdownProps> = ({
    id,
    label,
    value,
    options,
    onChange,
    required
}) => (
    <div className="p-field">
        <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
        <Dropdown
            id={id}
            value={value}
            options={options}
            onChange={e => onChange(e.value)}
            className="w-full"
        />
    </div>
);