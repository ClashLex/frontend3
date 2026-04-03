'use client'

import { useState } from 'react'
import { logIn, signUp } from '@/app/actions/auth'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const action = mode === 'login' ? logIn : signUp
    const result = await action(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-navy mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your_username"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-navy mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary text-white rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
      </button>
    </form>
  )
}
