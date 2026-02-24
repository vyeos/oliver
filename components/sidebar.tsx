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
    <aside className="w-full h-full max-w-[220px] space-y-6 border-r border-[#d0c4bb] pr-4 text-[#221813]">
      <h1 className="font-serif text-4xl italic leading-none">oliver</h1>

      <nav className="space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 px-2 py-2 text-sm tracking-wide transition-colors hover:bg-[#f2e8df]"
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        ))}
      </nav>

      <button className="flex w-full items-center justify-center gap-2 border border-[#221813] bg-[#221813] px-4 py-2 text-sm tracking-wide text-[#fffaf5] transition-colors hover:bg-[#4f3528]">
        <AddSquareIcon className="size-4" />
        Create Post
      </button>
    </aside>
  );
};

export default Sidebar;
