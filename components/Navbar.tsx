import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logOut } from '@/app/actions/auth'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
      <nav className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-navy font-bold text-lg tracking-tight">
          Blog
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-muted hover:text-navy transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href={`/authors/${profile?.username}`}
                className="text-muted hover:text-navy transition-colors"
              >
                {profile?.username}
              </Link>
              <form action={logOut}>
                <button
                  type="submit"
                  className="text-muted hover:text-navy transition-colors"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-secondary text-white rounded-lg px-3 py-1.5 font-semibold hover:opacity-90 transition-opacity"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
