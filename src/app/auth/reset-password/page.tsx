import React from 'react'
import { Logo } from '@/app/components/ui/logo'
import ResetForm from "@/app/components/auth/resetForm";

export default function ResetPassword() {
  return (
   <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
    <Logo />

     <ResetForm />
    </main>
  )
}
