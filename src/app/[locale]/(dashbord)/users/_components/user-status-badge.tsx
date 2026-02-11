"use client";

import React from "react";
import { useTranslations } from "next-intl";

type UserStatus = "active" | "inactive" | "blocked";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const t = useTranslations("userPage.userStatus"); // لازم تعمل ملفات الترجمة

  const colors: Record<UserStatus, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-yellow-100 text-yellow-800",
    blocked: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-5  rounded-full text-sm font-medium ${colors[status]}`}
    >
      {t(status)}
    </span>
  );
};
