import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PostForm from '@/components/PostForm'
import { createPost } from '@/app/actions/posts'

export default async function NewPostPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-8">New Post</h1>
      <PostForm action={createPost} />
    </main>
  )
}
