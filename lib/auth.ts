import { getSupabaseClient } from './supabase/client'

export async function isAuthenticated() {
  const supabase = getSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  return !!session
}

export async function getCurrentUser() {
  const supabase = getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function signOut() {
  const supabase = getSupabaseClient()
  await supabase.auth.signOut()
  window.location.href = '/'
} 