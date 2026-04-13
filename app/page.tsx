
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

  // Count unique authors
  const authorCount = posts
    ? new Set(posts.map((p) => {
        const profile = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles
        return profile?.username
      })).size
    : 0

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">

          <div className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Open Publishing
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-4 leading-tight">
            Ideas worth <span className="italic text-primary">reading.</span>
          </h1>

          <p className="text-muted text-lg max-w-xl mx-auto mb-6">
            A space for writers to share their thoughts. Read the latest posts or start writing your own.
          </p>

          {/* ── NEW: Stats row ── */}
          {posts && posts.length > 0 && (
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-navy">{posts.length}</div>
                <div className="text-xs text-muted uppercase tracking-wide">
                  {posts.length === 1 ? 'Post' : 'Posts'}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-navy">{authorCount}</div>
                <div className="text-xs text-muted uppercase tracking-wide">
                  {authorCount === 1 ? 'Writer' : 'Writers'}
                </div>
              </div>
            </div>
          )}

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

      {/* ── Feed ── */}
      <main id="posts" className="max-w-4xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">Latest Posts</h2>
          {posts && posts.length > 0 && (
            <span className="text-xs text-muted font-mono">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
          )}
        </div>

        {!posts || posts.length === 0 ? (
          /* ── NEW: Improved empty state ── */
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-navy font-semibold mb-1">No posts yet</p>
            <p className="text-muted text-sm mb-6">
              Be the first to share something with the world.
            </p>
            <Link
              href="/signup"
              className="bg-secondary text-white rounded-lg px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Write a post
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {posts.map((post, index) => {
              const profile = Array.isArray(post.profiles)
                ? post.profiles[0]
                : post.profiles

              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  username={profile?.username ?? 'unknown'}
                  createdAt={post.created_at}
                  excerpt={extractExcerpt(post.content)}
                  featured={index === 0}
                />
              )
            })}
          </div>
        )}

        {/* ── NEW: Bottom CTA ── */}
        {posts && posts.length > 0 && (
          <div className="mt-16 text-center border-t border-gray-100 pt-12">
            <p className="text-muted text-sm mb-4">
              Have something to share?
            </p>
            <Link
              href="/signup"
              className="bg-secondary text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start writing for free
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
