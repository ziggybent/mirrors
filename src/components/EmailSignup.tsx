'use client'

import { useState, FormEvent } from 'react'
import { subscribeToKit } from '@/app/actions/subscribe'

export default function EmailSignup() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        if (!email) return

        setStatus('loading')
        setMessage('')

        const result = await subscribeToKit(email)

        if (result.success) {
            setStatus('success')
            setMessage(result.message || 'Subscribed successfully')
            setEmail('')
        } else {
            setStatus('error')
            setMessage(result.error || 'Something went wrong')
        }

        // Reset status after 3 seconds
        setTimeout(() => {
            setStatus('idle')
            setMessage('')
        }, 3000)
    }

    return (
        <div className="w-full max-w-xl mx-auto p-12 text-center my-20">
            <h3 className="text-2xl font-medium mb-8 text-gray-900">Get notified of new mirrors</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-sm text-gray-600 focus:outline-none focus:border-gray-400 disabled:opacity-50"
                    required
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Subscribing...' : 'Sign up for Mirrors'}
                </button>
            </form>
            {message && (
                <p className={`text-sm mb-2 ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}
            <p className="text-sm text-gray-500">No spam. Unsubscribe anytime.</p>
        </div>
    )
}
