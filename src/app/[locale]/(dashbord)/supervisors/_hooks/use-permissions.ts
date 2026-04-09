import { useEffect, useState } from "react";
import { Permission } from "../../permissions/_components/role-permissions";
import { PermissionsResponse } from "@/src/lib/services/permissions/get-permissions";

interface UsePermissionsReturn {
  permissions: Permission[];
  isLoading: boolean;
  error: string | null;
}

export function usePermissions(): UsePermissionsReturn {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/permissions");

        if (!res.ok) throw new Error("Failed to fetch permissions");

        const data: PermissionsResponse = await res.json();
        setPermissions(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPermissions();
  }, []);

  return { permissions, isLoading, error };
}
