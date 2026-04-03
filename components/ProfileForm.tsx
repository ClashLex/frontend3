'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/actions/profile'

interface ProfileFormProps {
  initialUsername: string
  initialBio: string
  initialAvatarUrl: string
}

export default function ProfileForm({ initialUsername, initialBio, initialAvatarUrl }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await updateProfile(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-navy mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          defaultValue={initialUsername}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-navy mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={initialBio}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell readers a bit about yourself"
        />
      </div>
      <div>
        <label htmlFor="avatar_url" className="block text-sm font-medium text-navy mb-1">
          Avatar URL
        </label>
        <input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={initialAvatarUrl}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-secondary text-white rounded-lg px-5 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {loading ? 'Saving...' : 'Save profile'}
      </button>
    </form>
  )
}
