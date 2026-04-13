'use client';
import React from 'react';
import { InputProps } from '@/types/types';

export default function inputFeild({ label, error,required, ...props }:InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-[--color-foreground] opacity-90">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        {...props}     
        required={required}
        className={`
         w-full px-4 py-2.5 rounded-[6px] border outline-none transition-all duration-200
         bg-white text-slate-900 placeholder:text-slate-400
         border-slate-200 
         hover:border-slate-300
         focus:border-[#0052cc] focus:ring-4 focus:ring-[#0052cc]/5
         ${error ? 'border-red-500 ring-red-500/10' : ''}
       `}
      />

      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
}
