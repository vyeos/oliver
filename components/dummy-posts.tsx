export function DummyPosts() {
  const posts = [
    {
      author: "Maya Chen",
      handle: "@maya",
      time: "12m",
      content:
        "Shipped a tiny CLI that drafts feed posts from commit messages. It already feels faster than writing manually.",
      tags: ["cli", "git", "dx"],
    },
    {
      author: "Noah Park",
      handle: "@npark",
      time: "35m",
      content:
        "Testing RSS import styles so external articles feel native in Oliver's feed reading experience.",
      tags: ["rss", "design"],
    },
    {
      author: "Elena Ortiz",
      handle: "@elena",
      time: "1h",
      content:
        "Working note: smaller features, faster shipping, tighter feedback loops. This week is all about iteration.",
      tags: ["build", "product"],
    },
  ]

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Feed</p>
        <h2 className="font-serif text-3xl leading-tight">Today on Oliver</h2>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={`${post.author}-${post.time}`}
            className="bg-card border-border space-y-3 rounded-xl border p-4"
          >
            <header className="flex items-center justify-between text-sm">
              <div className="font-semibold">
                {post.author}{" "}
                <span className="text-muted-foreground font-normal">{post.handle}</span>
              </div>
              <span className="text-muted-foreground">{post.time}</span>
            </header>

            <p className="text-sm leading-relaxed">{post.content}</p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.author}-${tag}`}
                  className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
