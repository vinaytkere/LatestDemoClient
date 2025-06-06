import React from 'react';
import { AppInputText } from './AppInputText';
import { AppDropdown } from './AppDropdown';
import { AppCalendar } from './AppCalendar';
import { AppButton } from './AppButton';

type FieldType = 'text' | 'dropdown' | 'date';

export type FormField<T> = {
    key: keyof T;
    label: string;
    type?: FieldType;
    required?: boolean;
    options?: { label: string; value: unknown }[];
};

export interface AppFormProps<T> {
    model: T;
    fields: FormField<T>[];
    onSubmit: (model: T) => void;
    onChange: (key: keyof T, value: unknown) => void;
}

export function AppForm<T>({
    model,
    fields,
    onSubmit,
    onChange
}: AppFormProps<T>) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(model);
    };

    return (
        <form onSubmit={handleSubmit} className="p-fluid space-y-3">
            {fields.map(field => {
                const id = String(field.key);
                const value = model[field.key];

                switch (field.type) {
                    case 'dropdown':
                        return (
                            <AppDropdown
                                key={id}
                                id={id}
                                label={field.label}
                                value={value}
                                options={field.options || []}
                                onChange={val => onChange(field.key, val)}
                                required={field.required}
                            />
                        );

                    case 'date':
                        return (
                            <AppCalendar
                                key={id}
                                id={id}
                                label={field.label}
                                value={value !== null && value !== undefined ? String(value) : ''}
                                onChange={val => onChange(field.key, val)}
                                required={field.required}
                            />
                        );

                    default:
                        return (
                            <AppInputText
                                key={id}
                                id={id}
                                label={field.label}
                                value={value !== null && value !== undefined ? String(value) : ''}
                                onChange={val => onChange(field.key, val)}
                                required={field.required}
                            />
                        );
                }
            })}
            <AppButton label="Submit" type="submit" className="mt-2" />
        </form>
    );
}