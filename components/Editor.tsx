'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface EditorProps {
  initialContent?: object
  onChange: (json: object) => void
}

export default function Editor({ initialContent, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Write your post...' }),
    ],
    content: initialContent,
    onUpdate({ editor }) {
      onChange(editor.getJSON())
    },
    immediatelyRender: false,
  })

  if (!editor) return null

  const btn = (label: string, action: () => boolean, isActive: boolean) => (
    <button
      key={label}
      type="button"
      onClick={() => action()}
      className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
        isActive
          ? 'bg-primary text-white'
          : 'text-muted hover:text-navy hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-100 bg-gray-50">
        {btn('Bold', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'))}
        {btn('Italic', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'))}
        {btn('H1', () => editor.chain().focus().toggleHeading({ level: 1 }).run(), editor.isActive('heading', { level: 1 }))}
        {btn('H2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }))}
        {btn('Bullet', () => editor.chain().focus().toggleBulletList().run(), editor.isActive('bulletList'))}
        {btn('Ordered', () => editor.chain().focus().toggleOrderedList().run(), editor.isActive('orderedList'))}
        {btn('Quote', () => editor.chain().focus().toggleBlockquote().run(), editor.isActive('blockquote'))}
        {btn('Code', () => editor.chain().focus().toggleCode().run(), editor.isActive('code'))}
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none min-h-[280px] px-4 py-3 focus-within:outline-none"
      />
    </div>
  )
}
