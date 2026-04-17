'use server'
// i prefer using httponly cause i've used it before, its a server side security and to prevent xxs
import { cookies } from 'next/headers'

export async function storeTokensInCookie(currentToken: string, refreshToken: string, rememberMe: boolean) {
    const store = await cookies(); // cookie with new versions of next is async method

    const oneHour = 60 * 60
    const oneWeek = 60 * 60 * 24 * 7
    const sixMonths = 60 *60 * 24 * 30 * 6  

    const cookieConfig = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'lax' as const, // "Tell TS this is a specific literal type, not just any string, to match Cookie options" that's a new information for me
        path: '/'
    }
    

    store.set('sb-token', currentToken, {
        ...cookieConfig,
        maxAge: rememberMe ? sixMonths : oneHour,
    })

    const duration = rememberMe ? sixMonths : oneWeek;
    
    store.set('sb-refresh', refreshToken, {
        ...cookieConfig,
        maxAge: duration,
    })
}