"use client";
import LogoutButton from "@/components/auth/logout-button";
import ThemeToggle from "@/components/theme-toggle";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function Home() {
  const { isLoading, user } = useUser();
  return (
    <main>
      <ThemeToggle />
      <Image
        src="/full.svg"
        alt="logo"
        height={100}
        width={200}
        className="bg-foreground rounded-2xl"
      />
      {isLoading ? "Loading..." : user ? user.name : "no user"}
      <LogoutButton size="default" />
    </main>
  );
}
