import React from "react";
import RoleCard from "./role-card";

const roles = [
  {
    id: 1,
    title: "المشرف الرئيسي",
    description: "الوصول الكامل إلى النظام - لا يمكن حذفه",
    assignedCount: 3,
    pages: ["صفحات الإدارة", "لوحة التحكم", "التقارير", "المستخدمون"],
    extraCount: 6,
    isProtected: true,
    variant: "primary" as const,
  },
  {
    id: 2,
    title: "مشرف المحتوى",
    description: "إدارة المحتوى والمقالات فقط",
    assignedCount: 7,
    pages: ["المقالات", "التعليقات", "الوسوم", "الوسوم", "الوسوم", "الوسوم"],
    extraCount: 2,
  },
  {
    id: 2,
    title: "مشرف المحتوى",
    description: "إدارة المحتوى والمقالات فقط",
    assignedCount: 7,
    pages: ["المقالات", "التعليقات", "الوسوم", "الوسوم", "الوسوم", "الوسوم"],
    extraCount: 2,
  },
  {
    id: 2,
    title: "مشرف المحتوى",
    description: "إدارة المحتوى والمقالات فقط",
    assignedCount: 7,
    pages: ["المقالات", "التعليقات", "الوسوم", "الوسوم", "الوسوم", "الوسوم"],
    extraCount: 2,
  },
];

export default function RolesGrid() {
  return (
    <div className="grid grid-cols-2 gap-8">
      {roles.map((role) => (
        <RoleCard key={role.id} {...role} />
      ))}
    </div>
  );
}
