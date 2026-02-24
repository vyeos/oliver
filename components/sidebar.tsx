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
    <aside className="text-sidebar-foreground border-sidebar-border h-full w-full max-w-[220px] space-y-6 border-r pr-4">
      <h1 className="font-serif text-4xl italic leading-none">oliver</h1>

      <nav className="space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-3 px-2 py-2 text-sm tracking-wide transition-colors"
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        ))}
      </nav>

      <button className="border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/85 flex w-full items-center justify-center gap-2 border px-4 py-2 text-sm tracking-wide transition-colors">
        <AddSquareIcon className="size-4" />
        Create Post
      </button>
    </aside>
  );
};

export default Sidebar;
