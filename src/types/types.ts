import React from 'react';
import type { ForgotPassInput } from '@/lib/validations/auth';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    required?: boolean;
    showOptional?: boolean;
}

export interface ForgotProps {
    onSubmit: (data: ForgotPassInput) => void;
    isLoading: boolean;
}