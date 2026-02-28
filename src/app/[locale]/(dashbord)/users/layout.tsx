import React from "react";
import UserHeader from "./_components/user-header";
import UsersStatisctics from "./_components/users-statisctics";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <UserHeader />
      <UsersStatisctics />
      {children}
    </main>
  );
}
