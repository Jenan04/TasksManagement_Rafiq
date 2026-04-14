'use server'
// i prefer using httponly cause i've used it before, its a server side security and to prevent xxs
import { cookies } from 'next/headers'

export async function storeTokensInCookie(currentToken: string, refreshToken: string) {
    const store = await cookies(); // cookie with new versions of next is async method

    const cookieConfig = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const, // "Tell TS this is a specific literal type, not just any string, to match Cookie options" that's a new information for me
        path: '/'
    }
    
    store.set('sb-token', currentToken, {
        ...cookieConfig,
        maxAge: 60*60,
    })

    store.set('sb-refresh', refreshToken, {
        ...cookieConfig,
        maxAge: 60*60*24*7,
    })
}