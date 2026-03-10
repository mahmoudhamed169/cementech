import React from "react";
import RoleCard from "./role-card";

const roles = [1, 2, 3, 4];

export default function RolesGrid() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {roles.map((role) => (
        <RoleCard key={role} />
      ))}
    </div>
  );
}
