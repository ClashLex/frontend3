import type { Json } from './supabase/types'

export function extractExcerpt(content: Json, maxLength = 160): string {
  try {
    const doc = content as { content?: Array<{ content?: Array<{ text?: string }> }> }
    const texts: string[] = []
    for (const block of doc.content ?? []) {
      for (const inline of block.content ?? []) {
        if (inline.text) texts.push(inline.text)
      }
      if (texts.join(' ').length >= maxLength) break
    }
    const full = texts.join(' ')
    return full.length > maxLength ? full.slice(0, maxLength).trimEnd() + '...' : full
  } catch {
    return ''
  }
}
