import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PostContent from '@/components/PostContent'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('id, title, content, created_at, status, profiles(username)')
    .eq('id', id)
    .single()

  if (!post || post.status !== 'published') notFound()

  const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-navy mb-3">{post.title}</h1>
      <div className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link
          href={`/authors/${profile?.username}`}
          className="text-primary font-medium hover:underline"
        >
          {profile?.username}
        </Link>
        <span>·</span>
        <time dateTime={post.created_at}>{date}</time>
      </div>
      <PostContent content={post.content} />
    </main>
  )
}
