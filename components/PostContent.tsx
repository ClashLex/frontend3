'use client'

import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import type { Json } from '@/lib/supabase/types'

export default function PostContent({ content }: { content: Json }) {
  const html = generateHTML(content as Parameters<typeof generateHTML>[0], [StarterKit])
  return (
    <div
      className="prose prose-navy max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
