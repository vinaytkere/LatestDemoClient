import { InputText } from 'primereact/inputtext';
import React from 'react';

interface AppInputTextProps {
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    required?: boolean;
    type?: string;
}

export const AppInputText: React.FC<AppInputTextProps> = ({ id, label, value, onChange, required, type = 'text' }) => (
    <div className="p-field">
        <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
        <InputText id={id} type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full" />
    </div>
);