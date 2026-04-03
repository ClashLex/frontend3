'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const title = formData.get('title') as string
  const content = JSON.parse(formData.get('content') as string)
  const status = formData.get('status') as 'draft' | 'published'

  const { data, error } = await supabase
    .from('posts')
    .insert({ author_id: user.id, title, content, status })
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/dashboard')
  redirect(status === 'published' ? `/posts/${data.id}` : '/dashboard')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const title = formData.get('title') as string
  const content = JSON.parse(formData.get('content') as string)
  const status = formData.get('status') as 'draft' | 'published'

  const { error } = await supabase
    .from('posts')
    .update({ title, content, status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('author_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/dashboard')
  revalidatePath(`/posts/${id}`)
  redirect(status === 'published' ? `/posts/${id}` : '/dashboard')
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.from('posts').delete().eq('id', id).eq('author_id', user.id)

  revalidatePath('/')
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
