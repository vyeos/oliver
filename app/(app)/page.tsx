import { DummyPosts } from "@/components/dummy-posts";

export default function HomePage() {
  const timeline = [
    "You posted a build log for your CLI release workflow.",
    "Frontend Weekly RSS source was refreshed with 3 new articles.",
    "Two developers you follow pushed new commit-linked posts.",
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
        Home
      </p>
      <h1 className="font-serif text-2xl">Your developer timeline</h1>
      <p className="text-muted-foreground text-sm">
        Recent posts from people and RSS sources you follow.
      </p>
      <ul className="space-y-2">
        {timeline.map((item) => (
          <li key={item} className="bg-muted rounded-md px-3 py-2 text-sm">
            {item}
          </li>
        ))}
      </ul>
      <DummyPosts />
    </div>
  );
}
