'use server'
import { recoverPasswordApi } from '@/services/authService';

export async function forgotPasswordAction(email: string) {
  try {
    await recoverPasswordApi(email);
    return { success: true, message: 'If an account exists with this email, we’ve sent a reset link.' };
  } catch (error: any) {
    console.error("DEBUG: ForgotPassword Error ->", error);
    // return { success: false, error: 'Something went wrong.' };
    return { success: false, error: error.message || 'Something went wrong.' };
  }
}