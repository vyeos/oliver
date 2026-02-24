"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import type { CurrentUser } from "@/lib/types";
import { useUserStore } from "@/store/useUserStore";

export function useUser() {
  const { user, clearUser, setUser } = useUserStore();

  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    const sessionUser = session?.user;

    if (!sessionUser) {
      clearUser();
      return;
    }

    const normalizedUser: CurrentUser = {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      emailVerified: sessionUser.emailVerified,
      image: sessionUser.image ?? null,
      createdAt: String(sessionUser.createdAt),
      updatedAt: String(sessionUser.updatedAt),
    };

    setUser(normalizedUser);
  }, [clearUser, session?.user, setUser]);

  return {
    user,
    isLoading: isPending,
    error,
  };
}
