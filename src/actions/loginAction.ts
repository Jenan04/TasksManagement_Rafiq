'use server'
import { LoginInput } from '@/lib/validations/auth';
import { loginApi } from '@/services/authService'; 
import { storeTokensInCookie } from './cookie';

export async function loginAction(values: LoginInput) {
  try {

    const result = await loginApi(values);

    await storeTokensInCookie(
      result.access_token, 
      result.refresh_token, 
      !!values.rememberMe 
    );

    return { success: true, name: result.user?.user_metadata?.full_name || "User" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}