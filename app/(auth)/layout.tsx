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
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/70 bg-card/80 px-5 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-accent"
        >
          <span className="bg-primary/20 text-primary rounded-full px-2 py-0.5 text-[10px] tracking-[0.24em] uppercase">
            dev
          </span>
          <span className="relative text-base tracking-tight">
            <span className="text-foreground">oliv</span>
            <span className="text-primary">er</span>
            <span className="bg-primary/30 absolute -bottom-0.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        {children}
      </section>
    </main>
  )
}
