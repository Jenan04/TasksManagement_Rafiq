import { createServer } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams, origin } = new URL(req.url)
    const code = searchParams.get('code')

    if (code) {
    const cookieStore = await cookies()
    const supabase = createServer(cookieStore)

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}/reset-password`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=invalid_link`)
}