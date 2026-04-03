import { extractExcerpt } from '@/lib/posts'

describe('extractExcerpt', () => {
  it('extracts text from a TipTap doc', () => {
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Hello world' }],
        },
      ],
    }
    expect(extractExcerpt(doc)).toBe('Hello world')
  })

  it('truncates long text at maxLength', () => {
    const longText = 'a'.repeat(200)
    const doc = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: longText }],
        },
      ],
    }
    const result = extractExcerpt(doc, 160)
    expect(result.length).toBeLessThanOrEqual(164) // 160 + '...'
    expect(result.endsWith('...')).toBe(true)
  })

  it('returns empty string for empty content', () => {
    const doc = { type: 'doc', content: [] }
    expect(extractExcerpt(doc)).toBe('')
  })

  it('returns empty string for invalid input', () => {
    expect(extractExcerpt(null)).toBe('')
    expect(extractExcerpt('bad')).toBe('')
  })
})
