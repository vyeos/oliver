export default function ExplorePage() {
  const trending = [
    { topic: "Build in Public", posts: 128 },
    { topic: "Agentic Tooling", posts: 92 },
    { topic: "React Performance", posts: 74 },
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
        Explore
      </p>
      <h1 className="font-serif text-2xl">Trending builds</h1>
      <p className="text-muted-foreground text-sm">
        Discover popular posts, repos, and dev discussions.
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {trending.map((item) => (
          <article key={item.topic} className="bg-muted rounded-md p-3">
            <p className="font-medium">{item.topic}</p>
            <p className="text-muted-foreground text-xs">{item.posts} posts today</p>
          </article>
        ))}
      </div>
    </div>
  );
}
