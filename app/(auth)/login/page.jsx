'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

// components
import AuthForm from '../AuthForm'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [error, setError] = useState(null)
    const router = useRouter()

    const handleLogin = async (e, email, password) => {
        e.preventDefault()
        setError(null)

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) setError(error.message)
        if (!error) router.push('/')
    }

    return (
        <main>
            <h2 className='text-center'>Log in</h2>
            <AuthForm onSubmit={handleLogin} />
            {error && <div className='error'>{error}</div>}
        </main>
    )
}
