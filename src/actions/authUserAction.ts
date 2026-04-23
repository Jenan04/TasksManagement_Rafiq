'use server'
import { cookies } from 'next/headers';
import { storeTokensInCookie } from './cookie'

export async function getAuthUserAction() {
    const store = await cookies();
    console.log("All available cookies in Server Action:", store.getAll().map(c => c.name));
    const token = store.get('sb-token')?.value;
    const refreshToken = store.get('sb-refresh')?.value;

    console.log("Token from cookie:", token);
    if (!token) return { error: "No token found" };

    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`, {
        method: 'GET',
        headers: {
            'apikey': process.env.NEXT_PUBLIC_API_KEY!,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 401 && refreshToken) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/token?grant_type=refresh_token`, {
            method: 'POST',
            headers: { 'apikey': process.env.NEXT_PUBLIC_API_KEY!, 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken })
        });

        if (refreshRes.ok) {
            const newSession = await refreshRes.json();
            await storeTokensInCookie(newSession.access_token, newSession.refresh_token, true);
            
            res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/v1/user`, {
                headers: { 'Authorization': `Bearer ${newSession.access_token}`, 'apikey': process.env.NEXT_PUBLIC_API_KEY! }
            });
        }
    }

    if (!res.ok) return { error: "Failed to fetch user" };
    // return await res.json();
    const data = await res.json();
    
    return {
        name: data.user_metadata?.display_name || "User",
        jobTitle: data.user_metadata?.job_title || "",
        email: data.email
    };
}
