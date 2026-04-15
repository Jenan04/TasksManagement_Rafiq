'use client';
import { useState } from 'react';
import ForgotForm from "@/app/components/auth/forgotForm";
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      console.log("Sending reset link to:", data.email);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Reset link sent to your email!');
      setIsEmailSent(true); 
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <div className="absolute top-10 left-10 flex items-center gap-2">
      </div>

      <ForgotForm 
        onSubmit={handleForgotPassword} 
        isLoading={isLoading}
        isEmailSent={isEmailSent}
      />
      
    </main> 
  );
}