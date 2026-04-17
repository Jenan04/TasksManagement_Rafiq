import { Logo } from '@/app/components/ui/logo'
import LoginForm from "@/app/components/auth/loginForm";

export default function LogInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <Logo />
      <LoginForm />
      
    </main> 
  );
}