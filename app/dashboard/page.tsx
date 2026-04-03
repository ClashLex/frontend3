import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { deletePost } from '@/app/actions/posts'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, status, created_at')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">My Posts</h1>
        <Link
          href="/posts/new"
          className="bg-secondary text-white rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          New Post
        </Link>
      </div>
      {!posts || posts.length === 0 ? (
        <p className="text-muted text-sm">No posts yet. Write your first one!</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-muted'
                  }`}
                >
                  {post.status}
                </span>
                <span className="text-sm font-medium text-navy truncate">{post.title}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="text-xs text-primary hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    'use server'
                    await deletePost(post.id)
                  }}
                >
                  <button type="submit" className="text-xs text-red-500 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
