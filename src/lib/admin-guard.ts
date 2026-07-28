import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = { loading: boolean; isAdmin: boolean; email: string | null };

export function useAdminGuard(): AdminState {
  const [state, setState] = useState<AdminState>({ loading: true, isAdmin: false, email: null });
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        if (!cancelled) setState({ loading: false, isAdmin: false, email: null });
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled)
        setState({ loading: false, isAdmin: !!roles, email: userData.user.email ?? null });
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}
