import SettingHeaderPage from "./_components/setting-header-page";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen pt-12 pb-5 px-6 space-y-6">
      <SettingHeaderPage />
      {children}
    </main>
  );
}
