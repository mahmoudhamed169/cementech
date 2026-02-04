import Header from "@/src/components/shared/header";
import Sidebar from "@/src/components/shared/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ms-64 bg-zinc-100 min-h-screen">
        <Header />

        {children}
      </div>
    </main>
  );
}
