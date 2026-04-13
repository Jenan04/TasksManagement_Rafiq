'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput } from '@/lib/validations/auth';
import InputField from '../ui/inputFeild';
import { CheckCircle2, Circle } from 'lucide-react'; 
import Link from 'next/link';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange', 
  });

  const pass = watch('password', '');
  const hasChars = pass.length >= 8
  const hasMixed = /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass)
  const hasSpecial = /[^A-Za-z0-9]/.test(pass)

  const onSubmit = async (data: SignupInput) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="w-full max-w-[576px] bg-white rounded-[8px] p-[48px] shadow-sm border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Create your workspace</h1>
        <p className="text-gray-500 text-sm mt-2">Join the editorial approach to task management.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <InputField 
          label="NAME" 
          required={true}
          {...register('name')} 
          error={errors.name?.message} 
          placeholder="Enter your full name"
        />

        <InputField 
          label="EMAIL" 
          required={true}
          {...register('email')} 
          error={errors.email?.message} 
          placeholder="yourname@company.com"
        />

        <InputField 
          label="JOB TITLE" 
          required={false}
          {...register('jobTitle')} 
          placeholder="e.g. Project Manager"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField 
            label="PASSWORD" 
            required={true}
            type="password"
            {...register('password')}
            error={errors.password?.message} 
            placeholder="Minimum 8 characters"
          />
          <InputField 
            label="CONFIRM" 
            required={true}
            type="password"
            {...register('confirmPassword')} 
            error={errors.confirmPassword?.message} 
            placeholder="Repeat password"
          />
        </div>

        <div className=" p-4 space-y-2 ">
          <div className={`flex items-center gap-2 text-xs transition-all ${hasChars ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
            {hasChars ? <CheckCircle2 size={14} className="text-blue-600" /> : <Circle size={14} />} 
            At least 8 characters
          </div>
          
          <div className={`flex items-center gap-2 text-xs transition-all ${hasMixed ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
            {hasMixed ? <CheckCircle2 size={14} className="text-blue-600" /> : <Circle size={14} />} 
            One uppercase, lowercase, and digit
          </div>

          <div className={`flex items-center gap-2 text-xs transition-all ${hasSpecial ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
            {hasSpecial ? <CheckCircle2 size={14} className="text-blue-600" /> : <Circle size={14} />} 
            One special character
          </div>
        </div>

        <button 
          disabled={isSubmitting}
          className="w-full bg-[#0052cc] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-600">
           Already have an account?{' '}
           <Link 
             href="/login" 
             className="text-[#0052cc] font-semibold hover:underline transition-all"
           >
             Log in
           </Link>
         </div>
      </div>
  );
}