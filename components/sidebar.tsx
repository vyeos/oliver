import {
  Group01Icon,
  Home01Icon,
  AddSquareIcon,
  Notification01Icon,
  RssIcon,
  Search01Icon,
} from "hugeicons-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { Button } from "./ui/button";

const Sidebar = () => {
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

  return (
    <aside className="text-sidebar-foreground border-sidebar-border max-w-[220px] space-y-6 border-r pr-4">
      <h1 className="font-serif text-4xl italic leading-none">oliver</h1>

      <nav className="space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className=" text-sm tracking-wide transition-colors"
          >
            <Button
              variant="ghost"
              className="w-full h-full flex items-center justify-start gap-3"
            >
              <link.icon className="size-4" />
              {link.name}
            </Button>
          </Link>
        ))}
      </nav>

      <Button className="w-full">
        <AddSquareIcon className="size-4" />
        Create Post
      </Button>
    </aside>
  );
};

export default Sidebar;
