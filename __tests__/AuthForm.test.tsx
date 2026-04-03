import { render, screen } from '@testing-library/react'
import AuthForm from '@/components/AuthForm'

jest.mock('@/app/actions/auth', () => ({
  logIn: jest.fn(),
  signUp: jest.fn(),
}))

describe('AuthForm - login mode', () => {
  it('renders email and password fields', () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('does not render username field in login mode', () => {
    render(<AuthForm mode="login" />)
    expect(screen.queryByLabelText('Username')).not.toBeInTheDocument()
  })

  it('renders a Log in submit button', () => {
    render(<AuthForm mode="login" />)
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument()
  })
})

describe('AuthForm - signup mode', () => {
  it('renders username, email, and password fields', () => {
    render(<AuthForm mode="signup" />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders a Create account submit button', () => {
    render(<AuthForm mode="signup" />)
    expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument()
  })
})
