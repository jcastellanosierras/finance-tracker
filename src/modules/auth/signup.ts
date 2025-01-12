import { supabase } from "../../lib/supabase";

export const signup = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};
