/**
 * Supabase client helper — smoke tests verifying the factory functions
 * return an object with the expected shape without hitting the network.
 */

const mockClient = {
  auth: { getUser: jest.fn(), signUp: jest.fn(), signInWithPassword: jest.fn(), signOut: jest.fn() },
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  }),
}

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => mockClient),
  createServerClient: jest.fn(() => mockClient),
}))

import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@/lib/supabase/client'

describe('createClient (browser)', () => {
  it('calls createBrowserClient with env vars', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

    const client = createClient()

    expect(createBrowserClient).toHaveBeenCalledWith(
      'https://test.supabase.co',
      'test-anon-key'
    )
    expect(client).toBe(mockClient)
  })

  it('returned client exposes auth and from', () => {
    const client = createClient()
    expect(client.auth).toBeDefined()
    expect(typeof client.from).toBe('function')
  })
})
