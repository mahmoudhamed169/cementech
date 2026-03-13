import Guidelines from "./_components/guidelines";
import PermissionHeader from "./_components/permission-header";

export default function PermissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-12 pb-5 px-6 space-y-6">
      <PermissionHeader />
      <Guidelines />
      {children}
    </main>
  );
}
