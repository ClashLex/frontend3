'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const username = formData.get('username') as string
  const bio = formData.get('bio') as string
  const avatar_url = formData.get('avatar_url') as string

  const { error } = await supabase
    .from('profiles')
    .update({ username, bio: bio || null, avatar_url: avatar_url || null })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath(`/authors/${username}`)
  redirect(`/authors/${username}`)
}
