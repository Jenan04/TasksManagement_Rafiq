'use server'
import { signupApi, refreshTokenApi } from '@/services/signupService';
import { storeTokensInCookie } from './cookie';
import { cookies } from 'next/headers';

export async function signUpAction(data: any) {
  try {
    const result = await signupApi(data);
    
    if (result.access_token) {
      await storeTokensInCookie(result.access_token, result.refresh_token, false);
      return { success: true, user: result.user };
    }
    return { success: true, message: "Please check your email." };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function refreshMyTokenAction() {
  const store = await cookies();
  const refreshToken = store.get('sb-refresh')?.value;
  if (!refreshToken) return { error: "No refresh token" };

  try {
    const data = await refreshTokenApi(refreshToken);
    await storeTokensInCookie(data.access_token, data.refresh_token, true);
    return { success: true, accessToken: data.access_token };
  } catch {
    return { error: "Failed to refresh" };
  }
}