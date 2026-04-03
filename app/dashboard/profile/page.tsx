import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/ProfileForm'

export default async function EditProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, bio, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-8">Edit Profile</h1>
      <ProfileForm
        initialUsername={profile?.username ?? ''}
        initialBio={profile?.bio ?? ''}
        initialAvatarUrl={profile?.avatar_url ?? ''}
      />
    </main>
  )
}
