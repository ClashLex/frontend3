import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-navy mb-1">Welcome back</h1>
      <p className="text-muted text-sm mb-6">
        No account?{' '}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
      <AuthForm mode="login" />
    </>
  )
}
