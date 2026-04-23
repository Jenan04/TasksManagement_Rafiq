'use server'
import { LoginInput } from '@/lib/validations/auth';
import { storeTokensInCookie } from './cookie'; 

export async function sessionLogic(values: LoginInput) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 
      'apikey': process.env.NEXT_PUBLIC_API_KEY!,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password
    })
  });

  const result = await response.json();

  if (!response.ok) {
    return { error: "Invalid email or password" };
  }


  await storeTokensInCookie(
    result.access_token,
    result.refresh_token,
    !!values.rememberMe 
  );

  return { success: true, name: result.user?.user_metadata?.full_name || "User" };
}