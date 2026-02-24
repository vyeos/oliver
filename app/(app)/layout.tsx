import type { ReactNode } from "react";

import Sidebar from "@/components/sidebar";
import { NotificationsPanel } from "@/components/notifications-panel";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-5 p-4 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)_280px]">
      <Sidebar />

      <section className="bg-card border-border rounded-xl border p-4">
        {children}
      </section>

      <NotificationsPanel />
    </main>
  );
}
