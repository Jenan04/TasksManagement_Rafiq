// import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export function createClient() {
  return createBrowserClient(
    supabaseUrl!,
    supabaseAnonKey!
  )
}

// interface CookieStore {
//   get: (name: string) => { value: string } | undefined;
//   set: (options: { name: string; value: string } & CookieOptions) => void;
//   remove: (name: string, options: CookieOptions) => void;
// }

interface NextCookies {
  getAll: () => { name: string; value: string }[];
  set: (name: string, value: string, options: CookieOptions) => void;
}

export function createServer(cookieStore: any) {
  return createServerClient(
    supabaseUrl!,
    supabaseAnonKey!,
  
  {
      cookies: {
        get(name: string) { 
          return cookieStore.get(name)?.value 
        },
        set(name: string, value: string, options: any) { 
          cookieStore.set({ name, value, ...options }) 
        },
        remove(name: string, value: string, options: any) { 
          cookieStore.set({ name, value: '', ...options }) 
        },
      },
      // cookies: {
      //   getAll() {
      //     return cookieStore.getAll()
      //   },
      //   setAll(cookiesToSet) {
      //     try {
      //       cookiesToSet.forEach(({ name, value, options }) =>
      //         cookieStore.set(name, value, options)
      //       )
      //     } catch {
      //       // هذا الخطأ متوقع في Server Components التي تكون Read-only
      //     }
      //   },
      //   },
    }
  )
}