import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="border-border/70 bg-card/90 w-full max-w-2xl rounded-3xl py-5 shadow-lg backdrop-blur">
      <CardHeader className="space-y-2">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
          Signup
        </p>
        <CardTitle className="text-3xl tracking-tight">
          Create your Oliver profile
        </CardTitle>
        <CardDescription>
          Start posting updates, link commits, and join the developer
          conversation.
        </CardDescription>
      </CardHeader>
      <SignupForm />
    </Card>
  );
}
