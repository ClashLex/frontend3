import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function SignUpPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-navy mb-1">Create an account</h1>
      <p className="text-muted text-sm mb-6">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
      <AuthForm mode="signup" />
    </>
  )
}
