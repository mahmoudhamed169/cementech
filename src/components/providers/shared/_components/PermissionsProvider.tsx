"use client";

import { useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { usePermissionsStore } from "@/src/store/permissionsStore";

/**
 * حطّه جوه الـ SessionProvider في layout.tsx
 * بيمزامن الـ permissions من NextAuth session للـ Zustand store تلقائياً
 */
export function PermissionsProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const setPermissions = usePermissionsStore((s) => s.setPermissions);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.permissions) {
      setPermissions(session.user.permissions);
    } else if (status === "unauthenticated") {
      setPermissions(null);
    }
  }, [session, status]);

  return <>{children}</>;
}
