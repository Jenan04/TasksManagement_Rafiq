'use client';
import { Logo } from "@/components/ui/logo";
import { useState } from 'react';
import ForgotForm from "@/components/auth/forgotForm";
import toast from 'react-hot-toast';
// import { createClient } from '@/lib/supabase'
import { forgotPasswordAction } from '@/actions/forgotAction'

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [trials, setTrials] = useState(0);

  const handleForgotPassword = async (data: { email: string }) => {
    if (trials >= 3){
      toast.error('You have raeched the maximum num of trials')
      return
    }

    setIsLoading(true);
    try {
    const result = await forgotPasswordAction(data.email);

    if (result.success) {
      toast.success(result.message); 
      setIsEmailSent(true);
      setTrials(prev => prev + 1);
    } else {
      toast.error(result.error);
    }
  

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <Logo className="absolute top-10 left-10 md:top-14 md:left-14"/>

      <ForgotForm 
        onSubmit={handleForgotPassword} 
        isLoading={isLoading}
        isEmailSent={isEmailSent}
        trials={trials}
      />
      
    </main> 
  );
}