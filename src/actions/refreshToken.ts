'use server'
import { cookies } from 'next/headers';
import { storeTokensInCookie } from './cookie'; 

export async function refreshMyToken() {
  const store = await cookies();
  const refreshToken = store.get('sb-refresh')?.value;

  if (!refreshToken) return { error: "No refresh token" };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      'apikey': process.env.NEXT_PUBLIC_API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh_token: refreshToken })
  });

  const data = await response.json();

  if (data.access_token) {
    await storeTokensInCookie(data.access_token, data.refresh_token, true);
    return { success: true, accessToken: data.access_token };
  }

  return { error: "Failed to refresh" };
}