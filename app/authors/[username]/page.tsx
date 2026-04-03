import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/PostCard'
import { extractExcerpt } from '@/lib/posts'

interface Props {
  params: Promise<{ username: string }>
}

export default async function AuthorPage({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, bio, avatar_url, created_at')
    .eq('username', username)
    .single()

  if (!profile) notFound()

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, created_at')
    .eq('author_id', profile.id)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isOwner = user?.id === profile.id

  const joined = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-start gap-5 mb-10 pb-8 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0 overflow-hidden">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-2xl font-bold">
              {profile.username[0].toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-navy">{profile.username}</h1>
            {isOwner && (
              <Link
                href="/dashboard/profile"
                className="text-xs text-primary hover:underline"
              >
                Edit profile
              </Link>
            )}
          </div>
          {profile.bio && <p className="text-muted text-sm mt-1">{profile.bio}</p>}
          <p className="text-xs text-muted mt-1">Member since {joined}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-navy mb-4">Posts</h2>
      {!posts || posts.length === 0 ? (
        <p className="text-muted text-sm">No published posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              username={profile.username}
              createdAt={post.created_at}
              excerpt={extractExcerpt(post.content)}
            />
          ))}
        </div>
      )}
    </main>
  )
}
