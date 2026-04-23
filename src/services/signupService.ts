const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export const signupApi = async (data: any) => {
  const res = await fetch(`${API_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: { 'apikey': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      data: { display_name: data.name, job_title: data.jobTitle }
    })
  });
  
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Signup failed");
  return result;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: { 'apikey': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken })
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to refresh token");
  return data;
};
