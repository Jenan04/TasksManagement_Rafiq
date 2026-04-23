import React from 'react'
import { Logo } from '@/components/ui/logo'
import ResetForm from "@/components/auth/resetForm";

export default function ResetPassword() {
  return (
   <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
    <Logo className="absolute top-10 left-10 md:top-14 md:left-14"/>

     <ResetForm />
    </main>
  )
}
