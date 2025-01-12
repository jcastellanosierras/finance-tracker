import { createContext, useContext } from "react";
import { Session } from "@supabase/supabase-js";

export const AuthContext = createContext<{ session: Session | null, loading: boolean }>({ session: null, loading: false });

export function useAuth() {
  return useContext(AuthContext);
}