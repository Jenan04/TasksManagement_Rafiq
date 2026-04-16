'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPassSchema, type ResetPassInput } from '@/lib/validations/auth';
import InputFeild from '@/app/components/ui/inputFeild'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase'; 
import { CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react' // إضافة أيقونات العين

export default function ResetForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State لإظهار الباسورد
    const router = useRouter();
    const supabase = createClient(); 

    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<ResetPassInput>({
        resolver: zodResolver(resetPassSchema),
        mode: "onChange"
    });

    const newPasswordValue = watch("newPassword", "");

    const hasChars = newPasswordValue.length >= 8;
    const hasMixed = /[A-Z]/.test(newPasswordValue) && /[a-z]/.test(newPasswordValue) && /[0-9]/.test(newPasswordValue);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPasswordValue);

    const onSubmit = async (data: ResetPassInput) => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: data.newPassword,
            });

            if (error) throw error;

            toast.success("Your password has been updated successfully. Redirecting to login...");
            
            setTimeout(() => {
                router.push("/"); 
            }, 3000);

        } catch (error: any) {
            toast.error(error.message || "Invalid or expired reset link.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[576px] bg-white rounded-[8px] p-[48px] shadow-sm border border-gray-100">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Create a New Password</h1>
                <p className="text-gray-500 text-sm mt-2">Create a new, strong password to secure your workspace access</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="relative">
                    <InputFeild
                        label="NEW PASSWORD"
                        type={showPassword ? "text" : "password"} // تبديل النوع
                        {...register('newPassword')}
                        error={errors.newPassword?.message}
                        placeholder="Minimum 8 characters"
                    />
                    {/* أيقونة العين */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <InputFeild
                    label="CONFIRM PASSWORD"
                    type="password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    placeholder="Repeat your password"
                />

                <div className="p-4 space-y-2">
                    <div className={`flex items-center gap-2 text-xs transition-all ${hasChars ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                        {hasChars ? <CheckCircle2 size={14} className="text-blue-600" /> : <Circle size={14} />} 
                        At least 8 characters
                    </div>
                    
                    <div className={`flex items-center gap-2 text-xs transition-all ${hasMixed ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                        {hasMixed ? <CheckCircle2 size={14} className="text-blue-600" /> : <Circle size={14} />} 
                        One uppercase, lowercase, and digit
                    </div>

                    <div className={`flex items-center gap-2 text-xs transition-all ${hasSpecial ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                        {hasSpecial ? <CheckCircle2 size={14} className="text-blue-600" /> : <Circle size={14} />} 
                        One special character
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isLoading || !isValid}
                    className="w-full bg-[#0052CC] text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Updating..." : "Update Password"}
                </button>

                <div className="text-center">
                    <button 
                        type="button" 
                        onClick={() => router.push('/')}
                        className="text-[#0052CC] text-sm font-medium hover:underline"
                    >
                        Back to sign in
                    </button>
                </div>
            </form>
        </div>
    )
}