'use client';
import { Logo } from '@/app/components/ui/logo'
import React from 'react';
import SignUpForm from "@/app/components/auth/signupForm";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <Logo />
      <SignUpForm />
      
    </main> 
  );
}