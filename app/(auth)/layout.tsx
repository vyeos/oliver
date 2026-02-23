import type { ReactNode } from "react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="bg-primary/10 absolute inset-0 -z-20" />
      <div className="bg-background/80 absolute inset-0 -z-10" />

      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 md:gap-12">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
        >
          oliver
        </Link>

        {children}
      </section>
    </main>
  )
}
