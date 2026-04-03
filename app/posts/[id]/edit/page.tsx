import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PostForm from '@/components/PostForm'
import { updatePost } from '@/app/actions/posts'
import type { Json } from '@/lib/supabase/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: post } = await supabase
    .from('posts')
    .select('id, title, content, status, author_id')
    .eq('id', id)
    .single()

  if (!post || post.author_id !== user.id) notFound()

  async function handleUpdate(formData: FormData) {
    'use server'
    return updatePost(id, formData)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-8">Edit Post</h1>
      <PostForm
        action={handleUpdate}
        initialTitle={post.title}
        initialContent={post.content as Json}
        initialStatus={post.status as 'draft' | 'published'}
      />
    </main>
  )
}
