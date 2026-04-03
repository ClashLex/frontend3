'use client'

import { useState } from 'react'
import Editor from './Editor'
import type { Json } from '@/lib/supabase/types'

interface PostFormProps {
  action: (formData: FormData) => Promise<{ error: string } | undefined>
  initialTitle?: string
  initialContent?: Json
  initialStatus?: 'draft' | 'published'
}

export default function PostForm({
  action,
  initialTitle = '',
  initialContent,
  initialStatus = 'draft',
}: PostFormProps) {
  const [content, setContent] = useState<object>(
    (initialContent as object) ?? { type: 'doc', content: [] }
  )
  const [status, setStatus] = useState<'draft' | 'published'>(initialStatus)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set('content', JSON.stringify(content))
    formData.set('status', status)

    const result = await action(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-navy mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialTitle}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Post title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1">Content</label>
        <Editor
          initialContent={initialContent as object | undefined}
          onChange={setContent}
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-navy">Publish</span>
          <button
            type="button"
            role="switch"
            aria-checked={status === 'published'}
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              status === 'published' ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                status === 'published' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-xs text-muted">
            {status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-secondary text-white rounded-lg px-5 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
