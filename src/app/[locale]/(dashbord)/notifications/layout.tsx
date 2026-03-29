import NotificationPageHeader from "./_components/notification-page-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" min-h-screen pt-12 pb-5 px-6 space-y-6 ">
      <NotificationPageHeader />
      {children}
    </main>
  );
}
