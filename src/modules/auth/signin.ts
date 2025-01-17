import { supabase } from '../../lib/supabase'
import { getURL } from './utils/getUrl'

export const signin = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getURL(),
      queryParams: {
        prompt: 'select_account',
      },
    },
  })
}
