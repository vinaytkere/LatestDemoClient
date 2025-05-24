import { Button } from 'primereact/button';
import React from 'react';

interface AppButtonProps {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    icon?: string;
    className?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({ label, onClick, type = 'button', icon, className }) => (
    <Button
        label={label}
        icon={icon}
        iconPos="left"
        onClick={onClick}
        type={type}
        className={`p-button-sm ${className || 'p-button-primary'}`}
    />

);