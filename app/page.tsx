"use client";
import ThemeToggle from "@/components/theme-toggle";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();
  return (
    <main>
      {user ? user.name : "no user"}
      <Image
        src="/full.svg"
        alt="logo"
        height={100}
        width={200}
        className="bg-foreground rounded-2xl"
      />
      <ThemeToggle />
    </main>
  );
}
