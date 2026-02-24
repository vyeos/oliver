export default function RssPage() {
  const sources = [
    { name: "Frontend Weekly", unread: 3 },
    { name: "React Status", unread: 1 },
    { name: "Engineering at Scale", unread: 5 },
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">RSS</p>
      <h1 className="font-serif text-2xl">Subscribed sources</h1>
      <p className="text-muted-foreground text-sm">
        Read external articles in Oliver feed format.
      </p>
      <div className="space-y-2">
        {sources.map((source) => (
          <article
            key={source.name}
            className="bg-muted flex items-center justify-between rounded-md px-3 py-2"
          >
            <p className="font-medium">{source.name}</p>
            <span className="text-muted-foreground text-xs">{source.unread} unread</span>
          </article>
        ))}
      </div>
    </div>
  );
}
