"use client";

import type { Permissions } from "payload";
import type { PayloadRequest } from "payload";

import { useEffect } from "react";

import { useAuth } from "@/providers/Auth";

export const HydrateClientUser: React.FC<{
  permissions: Permissions;
  user: PayloadRequest["user"];
}> = ({ permissions, user }) => {
  const { setPermissions, setUser } = useAuth();

  useEffect(() => {
    setUser(user);
    setPermissions(permissions);
  }, [user, permissions, setUser, setPermissions]);

  return null;
};
