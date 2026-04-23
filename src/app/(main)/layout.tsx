import  Navbar  from '@/components/navbar/Navbar';
import { Logo } from '@/components/ui/logo'; 

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        
        <header className="flex items-center h-16 border-b border-gray-200 bg-white px-6">
           <div className="flex items-center h-full w-[240px]"> 
             <Logo />
           </div>
           <div className="flex-1 flex items-center justify-end h-full">
             <Navbar />
           </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}