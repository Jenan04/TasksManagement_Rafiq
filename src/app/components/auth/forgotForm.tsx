'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputFeild from '../ui/inputFeild'
import { ForgotProps } from '@/types/types';
import { forgotPassSchema, type ForgotPassInput } from '@/lib/validations/auth';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Timer } from 'lucide-react';

export default function ForgotForm({ onSubmit, isLoading, isEmailSent }: ForgotProps & { isEmailSent?: boolean }) {
  const [timeLeft, setTimeLeft] = useState(300); 

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPassInput>({
    resolver: zodResolver(forgotPassSchema),
    mode: "onChange"
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isEmailSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isEmailSent, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendClick = () => {
    setTimeLeft(300); 
    handleSubmit(onSubmit)(); 
  };

  return (
    <div className="w-full max-w-[576px] bg-white rounded-[8px] p-[48px] shadow-sm border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Forgot password?</h1>
        <p className="text-gray-500 text-sm mt-2">No worries, we'll send you reset instructions</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <InputFeild
          label="EMAIL ADDRESS"
          {...register('email')}
          error={errors.email?.message}
          placeholder="yourname@company.com"
          disabled={isEmailSent}
        />

        <button
          type="submit"
          disabled={isLoading || !isValid || isEmailSent}
          className={`w-full py-3 rounded-lg font-semibold transition-all 
             ${isValid && !isLoading && !isEmailSent
              ? 'bg-[#0052cc] text-white hover:bg-blue-700'
              : 'bg-[#0052cc]/60 text-white/80 cursor-not-allowed'
            }`}
        >
          {isLoading ? 'Sending Reset Link ...' : 'Send Reset Link'}
        </button>

        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#0052cc] font-semibold text-sm hover:underline"
          >
            <ArrowLeft size={16} />
            Back to log in
          </Link>
        </div>

        {isEmailSent && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-sm">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
              <p>If an account exists with this email, we've sent a password reset link.</p>
            </div>

            <div className="text-center space-y-4 border-t border-gray-50 pt-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Didn't receive the email?
              </p>
              <button
                type="button"
                disabled={timeLeft > 0 || isLoading}
                onClick={handleResendClick}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
                    ${timeLeft > 0
                    ? 'bg-[#f4f5f7] text-[#42526e] cursor-not-allowed'
                    : 'bg-blue-50 text-[#0052cc] hover:bg-blue-100 cursor-pointer'}`}
              >
                <Timer size={18} />
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend Link Now'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}