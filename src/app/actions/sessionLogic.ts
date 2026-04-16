'use server';
import { storeTokensInCookie } from './cookie'
import { LoginInput } from '@/lib/validations/auth'
// import { supabase } from '@/lib/supabase'
import { createServer } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function sessionLogic(values: LoginInput) {
  const cookieStore = await cookies()
  const supabase = createServer(cookieStore)

    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })  
      if (error) return { error: error.message }

      if (data.session) {
        // await storeTokensInCookie(
        //   data.session.access_token,
        //   data.session.refresh_token,
        //   !!values.rememberMe
        // );
        const name = data.user?.user_metadata?.full_name || "User";
        return { success: true, name}
      }
    
    return { error: "Login failed, please try again" }

    }catch (error) {
      console.error('Login Error:', error);
      return { error: 'Something went wrong' };
    }

}