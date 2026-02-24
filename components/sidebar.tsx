"use client";

import { useState } from "react";
import {
  Group01Icon,
  Home01Icon,
  AddSquareIcon,
  Notification01Icon,
  RssIcon,
  Search01Icon,
  UserCircleIcon,
  UserIcon,
  Logout01Icon,
  Settings02Icon,
} from "hugeicons-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Sidebar = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const navLinks: {
    name: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
  }[] = [
    {
      name: "Home",
      href: "/",
      icon: Home01Icon,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: Search01Icon,
    },
    {
      name: "Following",
      href: "/following",
      icon: Group01Icon,
    },
    {
      name: "RSS",
      href: "/rss",
      icon: RssIcon,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Notification01Icon,
    },
  ];

  const displayName = user?.name ?? "Guest";
  const handle = user?.email ?? "@oliver";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <aside className="text-sidebar-foreground border-sidebar-border flex h-full min-h-[calc(100vh-2rem)] flex-col space-y-6 border-r pr-4 md:sticky md:top-4">
      <h1 className="font-serif text-4xl italic leading-none">oliver</h1>

      <nav className="space-y-1">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="block">
            <Button
              variant="ghost"
              className="h-10 w-full items-center justify-start gap-3 text-sm tracking-wide"
            >
              <link.icon className="size-4" />
              {link.name}
            </Button>
          </Link>
        ))}
      </nav>

      <Button className="w-full" onClick={() => setIsCreateOpen(true)}>
        <AddSquareIcon className="size-4" />
        Create Post
      </Button>

      <div className="mt-auto pb-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-full items-center justify-start gap-3"
            >
              <UserCircleIcon className="size-5" />
              <div className="flex min-w-0 flex-col items-start">
                <span className="truncate text-sm font-medium">{displayName}</span>
                <span className="text-muted-foreground truncate text-xs">{handle}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px]">
            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              <UserIcon className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/settings")}>
              <Settings02Icon className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={() => void handleLogout()}>
              <Logout01Icon className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isCreateOpen ? (
        <div className="bg-foreground/40 fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-card border-border w-full max-w-xl rounded-xl border p-5 shadow-xl">
            <header className="mb-4 space-y-1">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">Create</p>
              <h2 className="font-serif text-2xl">Write a new post</h2>
              <p className="text-muted-foreground text-sm">
                Draft a text update or link your post to a commit.
              </p>
            </header>

            <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="dialogPostTitle" className="text-sm font-medium">
                  Title
                </label>
                <Input id="dialogPostTitle" placeholder="Ship notes, daily build log, or release update" />
              </div>

              <div className="space-y-2">
                <label htmlFor="dialogPostContent" className="text-sm font-medium">
                  Content
                </label>
                <Textarea
                  id="dialogPostContent"
                  rows={6}
                  placeholder="What did you build today? Share context, decisions, and next steps."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="dialogCommitLink" className="text-sm font-medium">
                  Commit URL (optional)
                </label>
                <Input id="dialogCommitLink" placeholder="https://github.com/user/repo/commit/..." />
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Publish Post</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </aside>
  );
};

export default Sidebar;
