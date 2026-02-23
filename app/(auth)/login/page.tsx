import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            post updates
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            link commits
          </span>
          <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1">
            explore dev feeds
          </span>
        </div>
      </section>

      <Card className="border-border/70 bg-card/90 w-full rounded-3xl py-5 shadow-lg backdrop-blur">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Log in to continue building your presence on Oliver.
          </CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}
