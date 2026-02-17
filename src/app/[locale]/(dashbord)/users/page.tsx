import UserHeader from "./_components/user-header";
import UsersList from "./_components/user-table/users-list";
import UsersStatisctics from "./_components/users-statisctics";

export default function page() {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <UserHeader />
      <UsersStatisctics />
      <UsersList />
    </main>
  );
}
