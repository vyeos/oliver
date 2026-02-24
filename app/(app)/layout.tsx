import type { ReactNode } from "react"

import Sidebar from "@/components/sidebar"
import { NotificationsPanel } from "@/components/notifications-panel"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-5 p-4 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <Sidebar />

        <div className="space-y-6 py-1">
          <section className="bg-card border-border rounded-xl border p-4">{children}</section>
        </div>

        <NotificationsPanel />
      </div>
    </main>
  )
}
