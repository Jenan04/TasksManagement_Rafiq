'use client';
import { Logo } from '@/components/ui/logo'
import React from 'react';
import SignUpForm from "@/components/auth/signupForm";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <Logo className="absolute top-10 left-10 md:top-14 md:left-14"/>
      <SignUpForm />
      
    </main> 
  );
}