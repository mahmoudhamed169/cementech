import { create } from "zustand";
import { Permissions, PermissionKey, HttpMethod } from "@/src/lib/types/permissions";

// ─── Store ────────────────────────────────────────────────────────────────────
// الـ permissions بتيجي من NextAuth session
// الـ store ده بيوفر helper functions سهلة الاستخدام في أي مكان

interface PermissionsState {
  permissions: Permissions | null;

  // Actions
  setPermissions: (permissions: Permissions | null) => void;

  // Helpers
  can: (resource: PermissionKey, method: HttpMethod) => boolean;
  canRead: (resource: PermissionKey) => boolean;
  canCreate: (resource: PermissionKey) => boolean;
  canUpdate: (resource: PermissionKey) => boolean;
  canDelete: (resource: PermissionKey) => boolean;
  isAdmin: () => boolean;
}

export const usePermissionsStore = create<PermissionsState>()((set, get) => ({
  permissions: null,

  setPermissions: (permissions) => set({ permissions }),

  can: (resource, method) => {
    const { permissions } = get();
    if (!permissions) return false;
    if (permissions.is_admin) return true;
    const perms = permissions[resource] as HttpMethod[] | undefined;
    return Array.isArray(perms) && perms.includes(method);
  },

  canRead: (resource) => get().can(resource, "GET"),
  canCreate: (resource) => get().can(resource, "POST"),
  canUpdate: (resource) => get().can(resource, "PATCH"),
  canDelete: (resource) => get().can(resource, "DELETE"),
  isAdmin: () => get().permissions?.is_admin ?? false,
}));
