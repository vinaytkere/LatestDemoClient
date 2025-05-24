import { Calendar } from 'primereact/calendar';
import React from 'react';

interface AppCalendarProps {
    id: string;
    label: string;
    value: Date | string | null | undefined;
    onChange: (value: Date | string | null) => void;
    required?: boolean;
}

export const AppCalendar: React.FC<AppCalendarProps> = ({
    id,
    label,
    value,
    onChange,
    required
}) => (
    <div className="p-field">
        <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
        <Calendar
            id={id}
            value={typeof value === 'string' ? new Date(value) : value || null}
            onChange={e => onChange(e.value)}
            className="w-full"
            dateFormat="yy-mm-dd"
        />
    </div>
);