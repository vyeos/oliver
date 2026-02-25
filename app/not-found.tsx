import Link from "next/link";
import { ArrowLeft01Icon, Home01Icon, Search01Icon } from "hugeicons-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center p-6">
      <section className="bg-card border-border w-full max-w-2xl rounded-2xl border p-8 md:p-10">
        <p className="text-muted-foreground text-xs tracking-[0.24em] uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-serif text-4xl italic md:text-5xl">
          This page went missing
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed md:text-base">
          The link may be outdated, or the page was moved. You can return to
          your feed or continue exploring Oliver.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/">
            <Button className="cursor-pointer gap-2 rounded-full px-5">
              <Home01Icon className="size-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              variant="outline"
              className="cursor-pointer gap-2 rounded-full px-5"
            >
              <Search01Icon className="size-4" />
              Explore
            </Button>
          </Link>
        </div>

        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground mt-7 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft01Icon className="size-4" />
          Back to Oliver
        </Link>
      </section>
    </main>
  );
}
