import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="grid w-full max-w-5xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <section className="bg-card/40 border-border/60 hidden rounded-3xl border p-8 backdrop-blur md:flex md:flex-col md:justify-between">
        <div className="space-y-4">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
            Login
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Pick up where your last commit left off.
          </h1>
          <p className="text-muted-foreground max-w-md">
            Jump back into your feed, share progress, and discover what fellow
            developers are building.
          </p>
        </div>

        <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Post Updates
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Link Commits
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            Explore Dev Feeds
          </span>
        </div>
      </section>

      <LoginForm />
    </div>
  );
}
