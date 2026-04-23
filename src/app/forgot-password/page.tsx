'use client';
import { Logo } from "@/app/components/ui/logo";
import { useState } from 'react';
import ForgotForm from "@/app/components/auth/forgotForm";
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase'


export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [trials, setTrials] = useState(0);

  const supabase = createClient();

  const handleForgotPassword = async (data: { email: string }) => {
    if (trials >= 3){
      toast.error('You have raeched the maximum num of trials')
      return
    }

    setIsLoading(true);
    try {
      // console.log("Sending reset link to:", data.email);
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Reset link sent to your email!');

      setIsEmailSent(true);
      setTrials(prev => prev + 1);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <Logo />

      <ForgotForm 
        onSubmit={handleForgotPassword} 
        isLoading={isLoading}
        isEmailSent={isEmailSent}
        trials={trials}
      />
      
    </main> 
  );
}