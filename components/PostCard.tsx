import Link from 'next/link'

interface PostCardProps {
  id: string
  title: string
  username: string
  createdAt: string
  excerpt: string
}

export default function PostCard({ id, title, username, createdAt, excerpt }: PostCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className="group border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all bg-white flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs text-muted">
        <Link
          href={`/authors/${username}`}
          className="font-medium text-primary hover:underline"
        >
          {username}
        </Link>
        <span>·</span>
        <time dateTime={createdAt}>{date}</time>
      </div>
      <Link href={`/posts/${id}`} className="block flex-1">
        <h2 className="text-base font-bold text-navy mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h2>
        {excerpt && (
          <p className="text-muted text-sm line-clamp-3 leading-relaxed">{excerpt}</p>
        )}
      </Link>
      <Link
        href={`/posts/${id}`}
        className="text-xs font-semibold text-primary hover:underline mt-auto pt-1"
      >
        Read more →
      </Link>
    </article>
  )
}
