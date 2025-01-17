import { supabase } from '../../lib/supabase'

export const logout = async () => {
  return await supabase.auth.signOut()
}