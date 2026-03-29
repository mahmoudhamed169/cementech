import SupervisorsHeader from "./_components/supervisors-header";

export default function SupervisorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-12 pb-5 px-6 space-y-6">
      <SupervisorsHeader />

      {children}
    </main>
  );
}
