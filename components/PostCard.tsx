import Link from 'next/link'

interface PostCardProps {
  id: string
  title: string
  username: string
  createdAt: string
  excerpt: string
  featured?: boolean
}

function getReadingTime(excerpt: string): string {
  const words = excerpt.trim().split(/\s+/).length
  const estimated = Math.max(1, Math.round(words / 15))
  return `${estimated} min read`
}

function getInitials(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

export default function PostCard({
  id,
  title,
  username,
  createdAt,
  excerpt,
  featured = false,
}: PostCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article
      className={`
        group relative border border-gray-100 rounded-2xl p-6
        hover:border-primary/40 hover:shadow-md hover:-translate-y-1
        transition-all duration-200 bg-white flex flex-col gap-3
        ${featured ? 'sm:col-span-2 border-primary/20 bg-gradient-to-br from-white to-blue-50/30' : ''}
      `}
    >
      {/* ── NEW: Featured badge ── */}
      {featured && (
        <div className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
          ✦ Latest
        </div>
      )}

      {/* ── NEW: Avatar + meta row ── */}
      <div className="flex items-center gap-2 text-xs text-muted">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {getInitials(username)}
        </div>
        <Link
          href={`/authors/${username}`}
          className="font-medium text-primary hover:underline"
        >
          {username}
        </Link>
        <span>·</span>
        <time dateTime={createdAt}>{date}</time>
        <span>·</span>
        {/* ── NEW: Reading time ── */}
        <span className="text-muted">{getReadingTime(excerpt)}</span>
      </div>

      {/* ── Title + excerpt ── */}
      <Link href={`/posts/${id}`} className="block flex-1">
        <h2
          className={`
            font-bold text-navy mb-1.5 group-hover:text-primary
            transition-colors leading-snug
            ${featured ? 'text-xl' : 'text-base'}
          `}
        >
          {title}
        </h2>
        {excerpt && (
          <p className="text-muted text-sm line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}
      </Link>

      {/* ── Footer row ── */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <Link
          href={`/posts/${id}`}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Read more →
        </Link>

        {/* ── NEW: Bookmark button ── */}
        <button
          onClick={() => {
            const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]')
            if (!saved.includes(id)) {
              localStorage.setItem('bookmarks', JSON.stringify([...saved, id]))
            }
          }}
          title="Bookmark this post"
          className="text-muted hover:text-accent transition-colors text-xs border border-gray-100 hover:border-accent/30 rounded-lg px-2 py-1"
        >
          🔖
        </button>
      </div>
    </article>
  )
}
