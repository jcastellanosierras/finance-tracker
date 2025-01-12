import { supabase } from "../../lib/supabase";

export const signin = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}