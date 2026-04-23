import { LoginInput } from '@/lib/validations/auth';

export const loginApi = async (values: LoginInput) => {
// export async function loginApi(values: LoginInput) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 
      'apikey': process.env.NEXT_PUBLIC_API_KEY!,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    })
  });

  const result = await response.json();
  
  if (!response.ok) throw new Error(result.message || "Invalid credentials");
  
  return result; 
};

export const recoverPasswordApi = async (email: string) => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + '/reset-password')}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': process.env.NEXT_PUBLIC_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email,
      // redirect_to: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
     }),
  });

   if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }
  
  return { success: true };
};

export const resetPasswordApi = async (newPassword: string, accessToken: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      'apikey': process.env.NEXT_PUBLIC_API_KEY!,
      'Authorization': `Bearer ${accessToken}`, 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: newPassword }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update password");
  return data;
};

