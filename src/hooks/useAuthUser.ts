'use client'
import { useState, useEffect } from 'react'
import { getAuthUserAction } from '@/actions/authUserAction' 

export const useAuthUser = () => {
    const [user, setUser] = useState<{name: string, jobTitle: string} | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getAuthUserAction();
            console.log("Data returned from Action:", data);
            if (data && !data.error) setUser(data);
            setLoading(false);
        }
        fetchUserData();
    }, [])

    return { user, loading };
}