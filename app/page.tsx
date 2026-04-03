import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/PostCard'
import { extractExcerpt } from '@/lib/posts'

export default async function FeedPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, content, created_at, profiles(username)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Open Publishing
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4 leading-tight">
            Ideas worth reading.
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto mb-8">
            A space for writers to share their thoughts. Read the latest posts or start writing your own.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/signup"
              className="bg-secondary text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start writing
            </Link>
            <a
              href="#posts"
              className="text-primary text-sm font-medium hover:underline"
            >
              Browse posts
            </a>
          </div>
        </div>
      </section>

      {/* Feed */}
      <main id="posts" className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-navy">Latest Posts</h2>
          {posts && posts.length > 0 && (
            <span className="text-xs text-muted">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
          )}
        </div>

        {!posts || posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-navy font-semibold mb-1">No posts yet</p>
            <p className="text-muted text-sm mb-6">Be the first to publish something.</p>
            <Link
              href="/signup"
              className="bg-secondary text-white rounded-lg px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Write a post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => {
              const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  username={profile?.username ?? 'unknown'}
                  createdAt={post.created_at}
                  excerpt={extractExcerpt(post.content)}
                />
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
