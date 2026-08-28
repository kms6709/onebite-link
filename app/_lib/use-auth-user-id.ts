"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function useAuthUserId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return userId;
}
