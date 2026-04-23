'use client';
import { useAuthUser } from '@/hooks/useAuthUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StyleProps } from '@/types/types';
import { cn } from "@/lib/utils";

const Navbar = ({ className }: StyleProps) => {
  const { user, loading } = useAuthUser();
  console.log("Navbar user state:", user);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const getInitials = (name?: string) => {
    if (!name) return "??";
    return name.split(' ').filter((n) => n.length > 0).map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // if (!isMounted) return null;

  if (loading) {
    return (
      <header className={cn("h-16 border-b border-gray-200 flex items-center justify-end px-6 bg-white animate-pulse", className)}>
        <div className="w-9 h-9 bg-gray-200 rounded-lg" />
      </header>
    );
  }

  const displayName = user?.name || user?.display_name ;
  const jobTitle = user?.jobTitle || user?.job_title ;

  return (
    <header className={cn("h-16 border-b border-gray-200 flex items-center justify-end px-6 bg-white", className)}>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500">{jobTitle}</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {getInitials(displayName)}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => router.push('/')}
          className="text-sm font-semibold text-[#0052cc] hover:underline"
        >
          ??
        </button>
      )}
    </header>
  );
};
export default Navbar;