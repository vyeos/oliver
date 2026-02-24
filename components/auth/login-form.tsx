"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import {
  GithubIcon,
  GoogleIcon,
  LockPasswordIcon,
  Mail01Icon,
} from "hugeicons-react";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters");

function getSchemaError(result: z.ZodSafeParseResult<string>) {
  if (result.success) {
    return undefined;
  }

  return result.error.issues[0]?.message ?? "Invalid value";
}

function validateEmail(value: string) {
  return getSchemaError(emailSchema.safeParse(value));
}

function validatePassword(value: string) {
  return getSchemaError(passwordSchema.safeParse(value));
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-destructive text-sm">{message}</p>;
}

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);

      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: "/",
      });

      if (error) {
        setSubmitError(error.message ?? "Unable to log in right now");
        return;
      }
    },
  });

  async function handleSocialLogin(provider: "google" | "github") {
    setSubmitError(null);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      setSubmitError(error.message ?? `Unable to continue with ${provider}`);
    }
  }

  return (
    <Card className="border-border/70 bg-card/90 w-full rounded-3xl py-5 shadow-lg backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
        <CardDescription>
          Log in to continue building your presence on Oliver.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-5 grid gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full justify-center bg-background/70"
            onClick={() => void handleSocialLogin("google")}
          >
            <GoogleIcon className="size-4" />
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full justify-center bg-background/70"
            onClick={() => void handleSocialLogin("github")}
          >
            <GithubIcon className="size-4" />
            Continue with GitHub
          </Button>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <div className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-[0.14em]">
            or use email
          </span>
          <div className="bg-border h-px flex-1" />
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          noValidate
        >
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => validateEmail(value),
              onSubmit: ({ value }) => validateEmail(value),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail01Icon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      autoComplete="email"
                      placeholder="you@oliver.dev"
                      className="pl-10"
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                  </div>
                  <FieldError message={error ? String(error) : undefined} />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => validatePassword(value),
              onSubmit: ({ value }) => validatePassword(value),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <LockPasswordIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="pl-10"
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                  </div>
                  <FieldError message={error ? String(error) : undefined} />
                </div>
              );
            }}
          </form.Field>

          {submitError ? (
            <p className="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm">
              {submitError}
            </p>
          ) : null}

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                className="h-10 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            )}
          </form.Subscribe>

          <p className="text-muted-foreground text-center text-sm">
            New to Oliver?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
