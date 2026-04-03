import { render, screen } from '@testing-library/react'
import PostCard from '@/components/PostCard'

describe('PostCard', () => {
  const props = {
    id: 'abc-123',
    title: 'Hello World',
    username: 'testuser',
    createdAt: '2024-01-15T00:00:00.000Z',
    excerpt: 'A short excerpt about the post.',
  }

  it('renders the post title', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders the author username', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('testuser')).toBeInTheDocument()
  })

  it('renders the excerpt', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('A short excerpt about the post.')).toBeInTheDocument()
  })

  it('links title to the post page', () => {
    render(<PostCard {...props} />)
    const titleLink = screen.getByText('Hello World').closest('a')
    expect(titleLink).toHaveAttribute('href', '/posts/abc-123')
  })

  it('links username to the author profile', () => {
    render(<PostCard {...props} />)
    const authorLink = screen.getByText('testuser').closest('a')
    expect(authorLink).toHaveAttribute('href', '/authors/testuser')
  })

  it('renders the formatted date', () => {
    render(<PostCard {...props} />)
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
  })
})
