import { Logo } from '@/components/ui/logo'
import LoginForm from "@/components/auth/loginForm";
import AuthHandler from "@/components/auth/AuthHandler";

export default function LogInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f4f7fa] p-4">
      <AuthHandler />
      <Logo  className="absolute top-10 left-10 md:top-14 md:left-14"/>
      <LoginForm />
      
    </main> 
  );
}