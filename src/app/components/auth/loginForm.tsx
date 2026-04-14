'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import InputField from '../ui/inputFeild';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { storeTokensInCookie } from '@/app/actions/cookie';
export default function loginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', 
  });

  const router = useRouter();   
  const onSubmit = async (values: LoginInput) => { 
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (authData.session) {
        await storeTokensInCookie(
          authData.session.access_token, 
          authData.session.refresh_token
        );

        toast.success('Welcome back, Jean!'); 
        
        router.push('/dashboard');
        router.refresh(); 
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-[576px] bg-white rounded-[8px] p-[48px] shadow-sm border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 text-sm mt-2">Please enter your details to access your workspace</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
         <InputField 
             label="EMAIL" 
             {...register('email')} 
             error={errors.email?.message} 
             placeholder="yourname@company.com"
         />

         <InputField 
           label="PASSWORD" 
           type="password"
           {...register('password')}
           error={errors.password?.message} 
           placeholder="Enter your password"
       />

        <div className="flex items-center justify-between text-sm mt-[24px]">
           <label className="flex items-center gap-2 cursor-pointer group">
             <input 
               type="checkbox" 
               {...register('rememberMe')}
               className="w-4 h-4 rounded border-gray-300 accent-[#0052cc] cursor-pointer"
             />
             <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
               Remember Me
             </span>
           </label>

           <Link 
             href="/forgot-password" 
             className="text-[#0052cc] font-medium hover:underline"
           >
             Forgot Password?
           </Link>
         </div>

       <button 
          disabled={isSubmitting}
          className="w-full bg-[#0052cc] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 mt-[24px]"
        >
          {isSubmitting ? 'Logining...' : 'Log In'}
        </button>
      </form> 
      <div className="mt-[31px] border-t border-gray-100" />
      <div className="mt-[31px] text-center text-sm text-slate-600">
           Don&apos;t have an account?{' '}
           <Link 
             href="/signup" 
             className="text-[#0052cc] font-semibold hover:underline transition-all"
           >
             Sign Up
           </Link>
     </div>  
    </div>  
    )
}

