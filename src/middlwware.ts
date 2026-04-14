import { NextRequest, NextRespose } from 'next/server';

export function middleware(req: NextRequest){
    const token = req.cookies.get('sb-token')?.value
}